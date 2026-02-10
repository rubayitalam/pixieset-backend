import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Layout, Share2, Globe, ArrowRight, Shield, Zap, Image as ImageIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black p-1.5 rounded-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter">Pixieset</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-black transition-colors">Features</Link>
            <Link href="#showcase" className="hover:text-black transition-colors">Showcase</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="rounded-full bg-black text-white hover:bg-gray-800">
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider mb-8">
              <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              Empowering Modern Photographers
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto leading-[1.1]">
              Everything you need to <span className="text-gray-400">grow your photography business.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Beautiful client galleries, powerful portfolio websites, and seamless business tools. All in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-black/10" asChild>
                <Link href="/register">Create Your Website <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg" asChild>
                <Link href="/login">View Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-gray-50 border-y">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Powerful Features</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Built by photographers, for photographers. Every tool you need to excel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Portfolio Websites",
                  desc: "Stunning, customizable websites that reflect your unique style."
                },
                {
                  icon: <Layout className="w-6 h-6" />,
                  title: "Client Galleries",
                  desc: "Deliver high-resolution photos in a beautiful, interactive way."
                },
                {
                  icon: <Share2 className="w-6 h-6" />,
                  title: "Instant Sharing",
                  desc: "Let clients download and share their favorite moments instantly."
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Secure Storage",
                  desc: "Your work is protected and easily accessible anytime, anywhere."
                }
              ].map((feature, idx) => (
                <div key={idx} className="p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase / CTA Section */}
        <section id="showcase" className="py-24">
          <div className="container mx-auto px-6">
            <div className="rounded-[3rem] bg-black text-white p-12 md:p-24 overflow-hidden relative">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Ready to showcase your best work?</h2>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                  Join thousands of photographers who trust Pixieset to power their portfolio and deliver excellence to their clients.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-100" asChild>
                    <Link href="/register">Start Free Today</Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="h-14 px-8 rounded-full text-white hover:bg-white/10" asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:flex items-center justify-center bg-gradient-to-l from-white/10 to-transparent">
                <ImageIcon className="w-64 h-64 text-white/5 rotate-12" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
            <Camera className="w-5 h-5" />
            <span className="text-xl font-bold tracking-tighter">Pixieset</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Pixieset. Designed for photographers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
