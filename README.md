# Guia de Deploy: Site Estático na AWS S3 com GitHub Actions

Este documento serve como um guia detalhado para configurar a infraestrutura na AWS e o pipeline de deploy contínuo (CI/CD) com GitHub Actions para este projeto. O objetivo é hospedar um site estático de forma automatizada, segura e eficiente.

## Tabela de Conteúdos

1.  [Parte 1: Configuração do Ambiente AWS](#parte-1-configuração-do-ambiente-aws)
    * [1.1. Criação do Bucket S3](#11-criação-do-bucket-s3)
    * [1.2. Habilitação da Hospedagem de Site Estático](#12-habilitação-da-hospedagem-de-site-estático)
    * [1.3. Configuração da Política do Bucket (Bucket Policy)](#13-configuração-da-política-do-bucket-bucket-policy)
2.  [Parte 2: Configuração do Deploy Automático com GitHub Actions](#parte-2-configuração-do-deploy-automático-com-github-actions)
    * [2.1. Criação de um Usuário IAM na AWS](#21-criação-de-um-usuário-iam-na-aws)
    * [2.2. Adição das Credenciais aos Segredos do GitHub](#22-adição-das-credenciais-aos-segredos-do-github)
    * [2.3. Criação do Workflow do GitHub Actions](#23-criação-do-workflow-do-github-actions)
3.  [Como Executar o Projeto Localmente](#como-executar-o-projeto-localmente)

---

## Parte 1: Configuração do Ambiente AWS

Nesta etapa, preparamos o ambiente na AWS para receber e servir os arquivos do nosso site.

### 1.1. Criação do Bucket S3

O S3 (Simple Storage Service) será usado para armazenar e servir os arquivos estáticos do site.

1.  **Acesse o Console da AWS** e procure pelo serviço **S3**.
2.  Clique em **"Criar bucket"**.
3.  **Nome do bucket**: Escolha um nome único globalmente (ex: `meu-projeto-statico-2025`).
4.  **Região da AWS**: Selecione uma região próxima à maioria dos seus usuários (ex: `us-east-1`).
5.  **Configurações de acesso público**: Desmarque a opção **"Bloquear todo o acesso público"** e confirme a alteração. Isso é necessário para que os visitantes possam acessar o site.
6.  Mantenha as outras configurações padrão e clique em **"Criar bucket"**.

### 1.2. Habilitação da Hospedagem de Site Estático

Por padrão, um bucket apenas armazena arquivos. Precisamos instruí-lo a agir como um servidor web.

1.  Na lista de buckets, clique no nome do bucket recém-criado.
2.  Vá para a aba **"Propriedades"**.
3.  Role a página até a seção **"Hospedagem de site estático"** e clique em **"Editar"**.
4.  Selecione a opção **"Habilitar"**.
5.  Em **"Documento de índice"**, insira `index.html`.
6.  Clique em **"Salvar alterações"**.
7.  Após salvar, anote o **endpoint do site** que aparece nesta mesma seção. Este será o URL público do seu site.

### 1.3. Configuração da Política do Bucket (Bucket Policy)

Esta política concede permissão de leitura pública para todos os arquivos dentro do bucket.

1.  No seu bucket, vá para a aba **"Permissões"**.
2.  Na seção **"Política de bucket"**, clique em **"Editar"**.
3.  Cole o seguinte JSON, **substituindo `NOME_DO_SEU_BUCKET`** pelo nome exato do seu bucket:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::NOME_DO_SEU_BUCKET/*"
        }
    ]
}
```

4.  Clique em **"Salvar alterações"**.

---

## Parte 2: Configuração do Deploy Automático com GitHub Actions

Agora, vamos automatizar o processo para que cada `push` na branch `main` atualize o site automaticamente.

### 2.1. Criação de um Usuário IAM na AWS

Criamos um usuário "robô" com permissões específicas para o GitHub Actions, em vez de usar nossas credenciais pessoais.

1.  No Console da AWS, acesse o serviço **IAM**.
2.  No menu lateral, clique em **"Usuários"** e depois em **"Adicionar usuários"**.
3.  **Nome de usuário**: Dê um nome descritivo (ex: `github-actions-deployer`).
4.  Selecione **"Chave de acesso - Acesso programático"**.
5.  Na tela de permissões, selecione **"Anexar políticas existentes diretamente"**.
6.  Procure e selecione a política `AmazonS3FullAccess`.
7.  Prossiga até criar o usuário. Na tela final, **copie e guarde o "ID da chave de acesso" e a "Chave de acesso secreta"**. Elas não serão mostradas novamente.

### 2.2. Adição das Credenciais aos Segredos do GitHub

Armazenamos as chaves da AWS de forma segura no cofre do GitHub.

1.  No seu repositório GitHub, vá para **Settings > Secrets and variables > Actions**.
2.  Clique em **"New repository secret"** e adicione os seguintes segredos:
    * `AWS_S3_BUCKET`: O nome do bucket que você criou.
    * `AWS_ACCESS_KEY_ID`: O ID da chave de acesso do usuário IAM.
    * `AWS_SECRET_ACCESS_KEY`: A chave de acesso secreta do usuário IAM.
    * `AWS_REGION`: A região do seu bucket (ex: `us-east-1`).

### 2.3. Criação do Workflow do GitHub Actions

Este arquivo define os passos que a automação seguirá. Crie o arquivo `.github/workflows/deploy.yml` no seu repositório com o seguinte conteúdo:

```yaml
name: Build and Deploy to AWS S3

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    # 1. Baixa o código do repositório
    - name: Checkout repository
      uses: actions/checkout@v3

    # 2. Configura o ambiente Node.js para rodar os comandos de build
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    # 3. Instala as dependências do projeto
    - name: Install dependencies
      run: npm install

    # 4. Gera a versão final e estática do site na pasta 'dist'
    - name: Build project
      run: npm run build

    # 5. Sincroniza o conteúdo da pasta 'dist' com o bucket S3
    - name: Deploy to S3
      uses: jakejarvis/s3-sync-action@master
      with:
        args: --follow-symlinks --delete
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: ${{ secrets.AWS_REGION }}
        SOURCE_DIR: 'dist' # O diretório de origem é a pasta de build
```

Após salvar e enviar este arquivo para a branch `main`, o primeiro deploy será acionado. Qualquer `push` futuro para a `main` também acionará o workflow, mantendo o site sempre atualizado.

---

## Como Executar o Projeto Localmente

1.**Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Abra o endereço local (geralmente `http://localhost:5173`) no seu navegador.
