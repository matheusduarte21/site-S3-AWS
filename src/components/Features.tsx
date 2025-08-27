import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Container, BarChart3, Zap, Shield, Settings } from "lucide-react";
import toolsImage from "@/assets/devops-tools.jpg";

const Features = () => {
  const features = [
    {
      icon: GitBranch,
      title: "CI/CD Pipeline",
      description: "Integração e deploy contínuo automatizado com testes e validações.",
      badge: "Auto"
    },
    {
      icon: Container,
      title: "Containerização",
      description: "Deploy com Docker e orquestração Kubernetes para máxima escalabilidade.",
      badge: "K8s"
    },
    {
      icon: BarChart3,
      title: "Monitoring 360°",
      description: "Observabilidade completa com métricas, logs e traces em tempo real.",
      badge: "Real-time"
    },
    {
      icon: Zap,
      title: "Auto Scaling",
      description: "Escalabilidade automática baseada em demanda e performance.",
      badge: "Smart"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Segurança integrada em cada etapa do pipeline DevSecOps.",
      badge: "DevSecOps"
    },
    {
      icon: Settings,
      title: "Infrastructure as Code",
      description: "Gerencie toda infraestrutura como código versionado e auditável.",
      badge: "IaC"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            DevOps Completo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas e práticas modernas para acelerar seus deploys e garantir estabilidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-primary transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 bg-accent text-accent-foreground font-semibold shadow-accent"
                  >
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 relative">
          <div className="bg-gradient-code rounded-3xl p-8 md:p-12 overflow-hidden relative text-white">
            <div 
              className="absolute inset-0 opacity-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${toolsImage})` }}
            />
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para DevOps?
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de equipes que já aceleraram seus deploys em 10x com nossa plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:shadow-primary transition-all duration-300 hover:scale-105">
                  Teste Grátis por 14 Dias
                </button>
                <button className="border border-accent text-accent font-semibold px-8 py-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  Agendar Demo
                </button>
              </div>
              
              <div className="mt-8 flex justify-center items-center space-x-8 text-sm text-white/70">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Setup em 5 min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Suporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;