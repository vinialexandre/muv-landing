'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function AnimatedCounter({ target, duration = 1200 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return (
    <div ref={counterRef} className="text-5xl font-bold mb-3 text-[#f6fa36] text-center">
      {count}+
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const modalidades = [
    {
      icon: '🥋',
      title: 'Jiu-Jitsu',
      description: 'Arte marcial brasileira focada em técnicas de solo, alavancas e estrangulamentos. Desenvolva disciplina, autocontrole e defesa pessoal efetiva.',
      benefits: ['Defesa pessoal', 'Disciplina mental', 'Condicionamento físico']
    },
    {
      icon: '💪',
      title: 'Funcional',
      description: 'Treinamento dinâmico que trabalha força, resistência e mobilidade. Exercícios variados para melhorar seu condicionamento físico geral.',
      benefits: ['Emagrecimento', 'Força e resistência', 'Mobilidade']
    },
    {
      icon: '🥊',
      title: 'Boxe',
      description: 'A nobre arte do pugilismo. Aprimore reflexos, coordenação motora e condicionamento cardiovascular através de técnicas de socos e movimentação.',
      benefits: ['Reflexos rápidos', 'Cardio intenso', 'Coordenação motora']
    },
    {
      icon: '🏅',
      title: 'MMA',
      description: 'Artes marciais mistas combinando técnicas de striking e grappling. Treinamento completo para quem busca o mais alto nível de preparação física e técnica.',
      benefits: ['Treino completo', 'Alta performance', 'Técnicas variadas']
    }
  ];

  const depoimentos = [
    {
      nome: 'Carlos Silva',
      texto: 'Treino na MUV há 2 anos e minha vida mudou completamente. Perdi 15kg e ganhei muita confiança.',
      modalidade: 'Funcional'
    },
    {
      nome: 'Ana Paula',
      texto: 'O Jiu-Jitsu me ensinou disciplina e autocontrole. Os professores são excelentes e o ambiente é acolhedor.',
      modalidade: 'Jiu-Jitsu'
    },
    {
      nome: 'Roberto Lima',
      texto: 'Melhor academia da região! Estrutura top e profissionais qualificados. Recomendo demais!',
      modalidade: 'MMA'
    }
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-white/10 shadow-lg">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center max-w-7xl">
          <Image src="/logo-muv-white.png" alt="MUV" width={56} height={56} className="h-14" />

          <ul className="hidden md:flex gap-8 text-white items-center absolute left-1/2 transform -translate-x-1/2 -ml-7">
            <li><a href="#modalidades" className="hover:text-[#f6fa36] transition-colors font-medium">Modalidades</a></li>
            <li><a href="#soma" className="hover:text-[#f6fa36] transition-colors font-medium">Projeto SOMA</a></li>
            <li><a href="#depoimentos" className="hover:text-[#f6fa36] transition-colors font-medium">Depoimentos</a></li>
            <li><a href="#contato" className="hover:text-[#f6fa36] transition-colors font-medium">Contato</a></li>
          </ul>

          <div className="flex items-center gap-4">
            <a href="#contato" className="hidden md:inline-block bg-[#f6fa36] hover:bg-[#e5e925] text-black px-6 py-2.5 rounded-full transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105">
              Marcar Aula
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <ul className="flex flex-col text-white py-4">
              <li><a href="#modalidades" onClick={() => setMobileMenuOpen(false)} className="block px-6 py-3 hover:bg-white/5 hover:text-[#f6fa36] transition-colors">Modalidades</a></li>
              <li><a href="#soma" onClick={() => setMobileMenuOpen(false)} className="block px-6 py-3 hover:bg-white/5 hover:text-[#f6fa36] transition-colors">Projeto SOMA</a></li>
              <li><a href="#depoimentos" onClick={() => setMobileMenuOpen(false)} className="block px-6 py-3 hover:bg-white/5 hover:text-[#f6fa36] transition-colors">Depoimentos</a></li>
              <li><a href="#contato" onClick={() => setMobileMenuOpen(false)} className="block px-6 py-3 hover:bg-white/5 hover:text-[#f6fa36] transition-colors">Contato</a></li>
              <li className="px-6 py-3">
                <a href="#contato" className="block text-center bg-[#f6fa36] hover:bg-[#e5e925] text-black px-6 py-2.5 rounded-full transition-all font-bold">
                  Marcar Aula
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="relative text-center text-white px-4 py-20 max-w-5xl mx-auto">
          <div className="animate-fade-in">
            <Image src="/logo-muv-white.png" alt="MUV" width={240} height={240} className="h-48 md:h-60 mb-6 mx-auto" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transforme seu corpo,<br />
              <span className="text-[#f6fa36]">fortaleça sua mente</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Jiu-Jitsu, Funcional, Boxe e MMA com os melhores professores da região.
              Marque sua aula hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contato" className="inline-block bg-[#f6fa36] hover:bg-[#e5e925] text-black px-10 py-4 rounded-full text-lg font-bold transition-all shadow-2xl hover:shadow-[#f6fa36]/50 hover:scale-105">
                Marque Sua Aula Hoje
              </a>
              <a href="#modalidades" className="inline-block border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 rounded-full text-lg font-bold transition-all">
                Conhecer Modalidades
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="modalidades" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Nossas Modalidades</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha a modalidade ideal para seus objetivos e comece sua transformação hoje mesmo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalidades.map((modalidade, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#f6fa36] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-4xl">{modalidade.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-black">{modalidade.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed text-center flex-grow">
                  {modalidade.description}
                </p>
                <div className="space-y-2 mb-6 h-20 flex flex-col justify-start ml-6">
                  {modalidade.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-[#f6fa36] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <a
                    href="#contato"
                    className="inline-block bg-black hover:bg-[#f6fa36] text-white hover:text-black px-6 py-3 rounded-full font-bold transition-all"
                  >
                    Experimentar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section id="depoimentos" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">O que dizem nossos alunos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Histórias reais de transformação e superação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-[#f6fa36]"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#f6fa36]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &ldquo;{depoimento.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#f6fa36] to-[#e5e925] rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {depoimento.nome.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-black">{depoimento.nome}</div>
                    <div className="text-sm text-gray-500">{depoimento.modalidade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="soma" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Projeto SOMA</h2>
            <div className="w-20 h-1 bg-[#f6fa36] mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed font-semibold">
              Mais do que uma academia, somos uma comunidade que transforma vidas
            </p>
            <p className="text-lg leading-relaxed mb-8 text-gray-300">
              O Projeto SOMA oferece aulas de Jiu-Jitsu para crianças em situação de vulnerabilidade social.
              Através do esporte, promovemos disciplina, respeito, autoestima e oportunidades para um futuro melhor.
            </p>
            <div className="flex justify-center mt-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                <AnimatedCounter target={100} />
                <div className="text-gray-300 text-lg text-center">Crianças atendidas</div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a href="#contato" className="inline-block bg-gradient-to-r from-[#f6fa36] to-[#e5e925] hover:from-[#e5e925] hover:to-[#d4d820] text-black px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-[#f6fa36]/50" style={{animation: 'pulse-scale 2s ease-in-out infinite'}}>
                Seja um Patrocinador
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-20 bg-gradient-to-b from-white to-gray-50 text-black">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Comece Hoje Mesmo</h2>
              <p className="text-xl text-gray-600">
                Agende sua aula experimental e descubra o poder da transformação
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-black to-gray-900 p-10 text-white">
                  <h3 className="text-3xl font-bold mb-8">Informações de Contato</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#f6fa36] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-[#f6fa36]">Endereço</h4>
                        <p className="text-gray-300">Av. Gen. Daltro Filho, 1655<br/>Hamburgo Velho, Novo Hamburgo</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#f6fa36] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-[#f6fa36]">Telefone</h4>
                        <p className="text-gray-300">+55 51 99311-6869</p>
                      </div>
                    </div>

                  </div>

                  <div className="mt-10 pt-10 border-t border-white/20">
                    <h4 className="font-bold mb-4 text-[#f6fa36]">Horário de Funcionamento</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Segunda a Sexta</span>
                        <span className="font-semibold">05h - 21h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Sábado</span>
                        <span className="font-semibold">08h - 13h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Domingo</span>
                        <span className="font-semibold">09h - 12h</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-6">Agende sua Aula</h3>
                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Nome Completo</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#f6fa36] focus:outline-none transition-colors"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">WhatsApp</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#f6fa36] focus:outline-none transition-colors"
                        placeholder="+55 51 99311-6869"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Modalidade de Interesse</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#f6fa36] focus:outline-none transition-colors">
                        <option>Selecione uma modalidade</option>
                        <option>Jiu-Jitsu</option>
                        <option>Funcional</option>
                        <option>Boxe</option>
                        <option>MMA</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#f6fa36] hover:bg-[#e5e925] text-black px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Agendar Aula
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-400 py-12 border-t border-[#f6fa36]/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo e texto à esquerda */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3 mb-1">
                <Image src="/logo-muv-white.png" alt="MUV" width={64} height={64} className="h-16" />
              </div>
              <p className="text-sm text-gray-400 max-w-xs">Transformando vidas através do esporte e da disciplina.</p>
            </div>

            {/* Três colunas no meio */}
            <div className="flex gap-16">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-[#f6fa36] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <h4 className="text-white font-bold">Endereço</h4>
                </div>
                <p className="text-sm text-gray-400 ml-8">Av. Gen. Daltro Filho, 1655<br/>Hamburgo Velho, Novo Hamburgo</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-[#f6fa36]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <h4 className="text-white font-bold">Telefone</h4>
                </div>
                <p className="text-sm text-gray-400 ml-8">+55 51 99311-6869</p>
              </div>

            </div>

            {/* Redes sociais à direita */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3 mb-3">
                <h5 className="text-white font-bold">Nos siga nas redes</h5>
              </div>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#f6fa36] rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/muv_nh/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#f6fa36] rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#f6fa36] rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 mt-8 text-center">
            <p className="text-sm">&copy; 2025 MUV Academia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botão WhatsApp fixo */}
      <a
        href="https://wa.me/5551993116869"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20b858] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Falar no WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
      </a>
    </div>
  );
}
