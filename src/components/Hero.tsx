import { Button } from "@/components/ui/button";
import heroImage from "@/assets/devops-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-primary opacity-90" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          DevOps
          <span className="block bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
            Simplificado
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Automatize, monitore e escale suas aplicações com nossa plataforma DevOps completa. 
          CI/CD, infraestrutura como código e observabilidade em um só lugar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-primary font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
          >
            Começar Deploy
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-primary-foreground hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
          >
            Ver Demos
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-white">99.9%</div>
            <div className="text-primary-foreground/70 text-sm">Uptime</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl font-bold text-white">&lt; 30s</div>
            <div className="text-primary-foreground/70 text-sm">Deploy Time</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-primary-foreground/70 text-sm">Deploys/dia</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-primary-foreground/70 text-sm">Monitoring</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;