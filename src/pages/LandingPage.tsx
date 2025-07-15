import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Check, 
  Play, 
  MessageSquare, 
  Users, 
  Kanban, 
  Video, 
  FileText, 
  Calendar,
  Star,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Real-time chat and messaging with organized channels for every project and direct messages for quick collaboration.",
      benefits: ["Organized channels", "Direct messaging", "Real-time sync"]
    },
    {
      icon: Kanban,
      title: "Project Management Made Simple", 
      description: "Visual project boards and timelines with task assignment, tracking, and progress monitoring that keeps everyone aligned.",
      benefits: ["Visual boards", "Task tracking", "Progress reports"]
    },
    {
      icon: Users,
      title: "Collaborative Workspace",
      description: "Document sharing, co-editing, screen sharing and video calls with integrated file storage for seamless teamwork.",
      benefits: ["Document sharing", "Video calls", "File storage"]
    }
  ];

  const testimonials = [
    {
      quote: "TeamFlow transformed how our remote team collaborates. We're more productive than ever.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "SJ"
    },
    {
      quote: "The best investment we made for our growing startup. Everything just works.",
      author: "Michael Chen", 
      role: "CEO of InnovateLab",
      avatar: "MC"
    },
    {
      quote: "Our team's productivity increased by 40% after switching to TeamFlow.",
      author: "Lisa Rodriguez",
      role: "Operations Director at GlobalTech", 
      avatar: "LR"
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 10 team members",
        "Basic chat and messaging", 
        "5GB storage",
        "Community support"
      ],
      cta: "Start for Free",
      popular: false
    },
    {
      name: "Professional", 
      price: "8",
      description: "Best for growing teams",
      features: [
        "Unlimited team members",
        "Advanced project management",
        "100GB storage per user",
        "Priority support",
        "Video conferencing"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations", 
      features: [
        "Custom integrations",
        "Advanced security features",
        "Dedicated account manager",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How is TeamFlow different from other collaboration tools?",
      answer: "TeamFlow uniquely combines project management, communication, and file sharing in one integrated platform, eliminating the need to switch between multiple apps."
    },
    {
      question: "Can I migrate my existing data from other platforms?",
      answer: "Yes! We provide seamless migration tools and dedicated support to help you transfer your data from Slack, Microsoft Teams, Asana, and other popular platforms."
    },
    {
      question: "What security measures does TeamFlow have?",
      answer: "We implement enterprise-grade security including SOC 2 Type II certification, end-to-end encryption, SSO integration, and regular security audits."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, TeamFlow is available on iOS and Android with full feature parity, so you can stay connected and productive from anywhere."
    },
    {
      question: "How does billing work?",
      answer: "We bill monthly or annually per user. You can upgrade, downgrade, or cancel anytime. Free tier is always free with no hidden costs."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide 24/7 chat support for Professional plans, email support for Free users, and dedicated account managers for Enterprise customers."
    }
  ];

  const integrations = [
    "Slack", "Microsoft Teams", "Google Workspace", "Zoom", "Calendly", "Asana",
    "GitHub", "Jira", "Trello", "Dropbox", "Google Drive", "OneDrive"
  ];

  const companyLogos = [
    "Microsoft", "Google", "Spotify", "Airbnb", "Netflix", "Uber"
  ];

  const stats = [
    { number: "10M+", label: "Messages sent daily" },
    { number: "500K+", label: "Projects completed" },
    { number: "99.9%", label: "Uptime guarantee" },
    { number: "50+", label: "Countries served" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">TeamFlow</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Product</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Solutions</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Resources</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Company</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="btn-primary">Try for Free</Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b bg-background">
          <nav className="container py-4 space-y-2">
            <Link to="#" className="block py-2 text-sm font-medium hover:text-primary">Product</Link>
            <Link to="#" className="block py-2 text-sm font-medium hover:text-primary">Solutions</Link>
            <Link to="#" className="block py-2 text-sm font-medium hover:text-primary">Pricing</Link>
            <Link to="#" className="block py-2 text-sm font-medium hover:text-primary">Resources</Link>
            <Link to="#" className="block py-2 text-sm font-medium hover:text-primary">Company</Link>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Where remote teams come{" "}
              <span className="text-gradient">together</span> to get work done
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 animate-slide-up">
              TeamFlow brings your team's communication, projects, and productivity tools 
              into one connected workspace.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8 animate-scale-in">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button className="btn-primary sm:w-auto">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-8">
              Free forever. No credit card required.
            </p>
            
            <div className="text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">500+</span> teams worldwide
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-b">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by teams at these companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {companyLogos.map((company) => (
              <div key={company} className="text-center">
                <div className="h-8 bg-muted rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                  <span className="text-sm font-medium">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Everything your team needs to stay{" "}
              <span className="text-gradient">connected</span> and productive
            </h2>
          </div>
          
          <div className="space-y-20">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center">
                        <Check className="h-5 w-5 text-success mr-3" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="aspect-video bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <feature.icon className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              See TeamFlow in <span className="text-gradient">action</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Watch how teams collaborate seamlessly with our integrated platform
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gradient-card rounded-lg shadow-elevated group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-success mr-3 flex-shrink-0" />
              <span>Set up in minutes, not days</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-success mr-3 flex-shrink-0" />
              <span>Integrates with tools you already use</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-success mr-3 flex-shrink-0" />
              <span>Works on any device, anywhere</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              The numbers speak for <span className="text-gradient">themselves</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center p-6 card-hover">
                <CardContent className="p-0">
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Loved by teams <span className="text-gradient">everywhere</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-medium mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Simple, <span className="text-gradient">transparent</span> pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free and upgrade as you grow
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`relative ${tier.popular ? 'border-primary shadow-glow' : ''} card-hover`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">
                        {tier.price === "Custom" ? tier.price : `$${tier.price}`}
                      </span>
                      {tier.price !== "Custom" && (
                        <span className="text-muted-foreground">/user/month</span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${tier.popular ? 'btn-primary' : ''}`}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Plays well with the tools you{" "}
              <span className="text-gradient">already love</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect TeamFlow with your favorite apps and services
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
            {integrations.map((integration) => (
              <div 
                key={integration}
                className="h-16 bg-card rounded-lg flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <span className="text-sm font-medium">{integration}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline">View all integrations</Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Frequently asked <span className="text-gradient">questions</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    className="w-full text-left p-6 hover:bg-secondary/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium pr-4">{faq.question}</h3>
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Ready to transform your team's productivity?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of teams who've made the switch to TeamFlow
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-primary hover:bg-white/90 sm:w-auto">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm opacity-80 mb-8">
              No credit card required • Free forever • Set up in minutes
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                4.8/5 stars on G2
              </div>
              <div>Leader in Team Collaboration</div>
              <div>SOC 2 Type II Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold">TeamFlow</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Security</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Mobile App</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">For Remote Teams</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">For Startups</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">For Enterprise</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">For Education</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Webinars</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">API Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Press</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 TeamFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;