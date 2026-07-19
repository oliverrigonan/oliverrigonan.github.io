import { Component, ChangeDetectionStrategy, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  constructor(
    public sanitizer: DomSanitizer
  ) { }

  mobileMenuOpen = signal(false);
  currentSlideIndex = signal<Record<string, number>>({});
  isScrolled = signal(false);
  selectedCategory = signal<string>('All');

  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  projects = [
    {
      id: 'upwisy',
      title: 'Upwisy - AI Learning Platform',
      description: 'An independent gig project focused on deep AI product work. Upwisy is an AI-powered learning platform for creating and delivering online courses, with OpenAI endpoint integrations, agentic workflow patterns, and RAG techniques for smarter content generation, personalized learning paths, and interactive learning experiences.',
      role: 'Software Engineer',
      engagement: 'Gig',
      technologies: ['Python', 'FastAPI', 'OpenAI', 'Angular', 'MongoDB', 'Qdrant', 'ChromaDB', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['upwisy-1.png', 'upwisy-2.png', 'upwisy-3.png', 'upwisy-4.png', 'upwisy-5.png'],
      category: 'AI'
    },
    {
      id: 'miming',
      title: 'Miming CAT (Cross Access Token)',
      description: 'A cross-chain token bridge solution that enables seamless transfer of digital assets across multiple blockchain networks. Miming CAT provides a secure and efficient way to move tokens between different chains, enhancing interoperability and expanding the possibilities for decentralized applications (dApps) and users in the blockchain ecosystem.',
      role: 'Lead Software Engineer',
      engagement: 'Company',
      technologies: ['TypeScript', 'NestJS', 'Angular', 'MongoDB', 'PolkadotJS', 'Polkadot XCM', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['miming-1.png', 'miming-2.png', 'miming-3.png', 'miming-4.png', 'miming-5.png'],
      category: 'Web3'
    },
    {
      id: 'xterium-wallet',
      title: 'Xterium Wallet',
      description: 'A secure and versatile Web3 wallet for the Xode Blockchain, enabling users to manage digital assets across multiple networks (Xode, Assethub). Designed to deliver seamless blockchain finance experiences while prioritizing security and user-friendly interaction across mobile apps, web, and browser extension surfaces.',
      role: 'Lead Software Engineer',
      engagement: 'Company',
      technologies: ['Angular', 'Ionic Framework', 'PolkadotJS', 'Google Play Console', 'App Store Connect', 'Chrome Extension'],
      images: ['xterium-1.png', 'xterium-2.png', 'xterium-3.png'],
      category: 'Mobile App'
    },
    {
      id: 'xode-blockchain',
      title: 'Xode Blockchain',
      description: 'A comprehensive blockchain platform with built-in on-chain governance, empowering developers to create Web3 games and enterprise decentralized applications (dApps). Supports development using Rust and Solidity and integrates with Polkadot to bridge gaming and business operations into the blockchain ecosystem.',
      role: 'Software Engineer',
      engagement: 'Company',
      technologies: ['Rust', 'Substrate (Polkadot SDK)'],
      images: ['xode-1.png', 'xode-2.png', 'xode-3.png'],
      category: 'Web3'
    },
    {
      id: 'jina-chatbot',
      title: 'JINA Virtual/AI Assistant - Chatbot',
      description: 'An AI-powered virtual assistant platform that enhances customer engagement and operational efficiency. Leveraging local and hosted LLM tooling, JINA enables businesses to deploy specialized virtual assistants tailored to handle specific operational tasks and address unique customer needs.',
      role: 'Lead Software Engineer',
      engagement: 'Company',
      technologies: ['Python', 'FastAPI', 'Ollama', 'LM Studio', 'Vue', 'MongoDB', 'Qdrant', 'ChromaDB', 'Proxmox', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['jina-1.png', 'jina-2.png', 'jina-3.png', 'jina-4.png'],
      category: 'AI'
    },
    {
      id: 'hiro-clinic',
      title: 'Hiro Clinic - Beauty System',
      description: 'A complete Web2 platform tailored for dermatology clinics in Japan. Streamlines daily clinic operations with integrated features for appointment scheduling, job order tracking, billing, patient management, and treatment planning, enhancing efficiency and patient experience.',
      role: 'Software Engineer',
      engagement: 'Company',
      technologies: ['PHP', 'Laravel', 'Angular', 'MySQL', 'AWS', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['hiro-1.png', 'hiro-2.png', 'hiro-3.png'],
      category: 'Web2'
    },
    {
      id: 'intellistream',
      title: 'IntelliStream',
      description: 'A system customized for Liteclerk Corporation clients. IntelliStream is a cloud-based budgeting and management tool designed to track streaming subscriptions, shows, and services, then analyze usage to recommend the most cost-effective combination of streaming plans.',
      role: 'Software Developer',
      engagement: 'Company',
      company: 'Liteclerk Corporation',
      technologies: ['PHP', 'Laravel', 'Angular', 'MySQL', 'AWS', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['intellistream-1.png', 'intellistream-2.png'],
      category: 'Web2'
    },
    {
      id: 'vaccine-tracker',
      title: 'Vaccine Tracker',
      description: 'A system customized for Liteclerk Corporation clients. Vaccine Tracker monitors vaccination eligibility for individuals and families, and sends timely phone or email notifications when new immunization opportunities become available.',
      role: 'Software Developer',
      engagement: 'Company',
      company: 'Liteclerk Corporation',
      technologies: ['PHP', 'Laravel', 'Angular', 'MySQL', 'AWS', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['vaccine-tracker-1.png', 'vaccine-tracker-2.png'],
      category: 'Web2'
    },
    {
      id: 'liteclerk-fis',
      title: 'Liteclerk - Cloud Accounting Software',
      description: 'A robust cloud-based SaaS accounting platform built for trading businesses. Offers comprehensive functionality including customer and sales management, payables, supply-chain tracking, inventory and warehouse management, accounting, and finance, all accessible securely via the cloud.',
      role: 'Software Developer',
      engagement: 'Company',
      technologies: ['C#', 'ASP.NET MVC 5', 'JavaScript', 'Microsoft SQL Server', 'LINQ'],
      images: ['liteclerk-fis-1.png', 'liteclerk-fis-2.png'],
      category: 'Web2'
    },
    {
      id: 'liteclerk-pos',
      title: 'Liteclerk POS',
      description: 'A lightweight yet powerful Point-of-Sale system that simplifies operational workflows for businesses. Provides real-time inventory tracking, instant sales and collection summaries, and detailed reports to control operations, minimize losses, and optimize cash flow management.',
      role: 'Software Developer',
      engagement: 'Company',
      technologies: ['C#', '.NET Framework', 'WinForms', 'Microsoft SQL Server', 'LINQ'],
      images: ['liteclerk-pos-1.png', 'liteclerk-pos-2.png'],
      category: 'Desktop App'
    },
  ];

  dailyTools = [
    'GitHub Copilot',
    'Claude Code',
    'Cursor',
    'OpenAI',
    'Ollama',
  ];

  heroTechs = [
    { key: 'Angular', label: 'Angular' },
    { key: 'Ionic Framework', label: 'Ionic' },
    { key: 'NestJS', label: 'NestJS' },
    { key: 'FastAPI', label: 'FastAPI' },
    { key: '.NET Framework', label: '.NET Framework' },
    { key: 'MongoDB', label: 'MongoDB' },
    { key: 'MySQL', label: 'MySQL' },
    { key: 'Microsoft SQL Server', label: 'SQL Server' },
    { key: 'Docker', label: 'Docker' },
    { key: 'Google Play Console', label: 'Google Play' },
    { key: 'App Store Connect', label: 'App Store Connect' },
    { key: 'OpenAI', label: 'OpenAI' },
    { key: 'Ollama', label: 'Ollama' },
    { key: 'GitHub Copilot', label: 'GitHub Copilot' },
    { key: 'Claude Code', label: 'Claude' },
    { key: 'Cursor', label: 'Cursor', invert: true },
  ];

  // Computed signal to get unique categories with custom sort order
  categories = computed(() => {
    const categoryOrder = ['AI', 'Web3', 'Mobile App', 'Web2', 'Desktop App'];
    const uniqueCategories = [...new Set(this.projects.map(p => p.category))];
    const sortedCategories = uniqueCategories.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      return indexA - indexB;
    });
    return ['All', ...sortedCategories];
  });

  // Computed signal to filter projects by selected category
  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    if (category === 'All') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === category);
  });

  experiences = [
    {
      company: 'Blockspace Corporation',
      position: 'Senior Software Engineer',
      period: 'Dec 2025 - Present',
      location: 'Mandaue, Central Visayas, Philippines · On-site',
      type: 'Full-time',
      description: `Enhanced and expanded Xterium as a secure multi-platform blockchain wallet across mobile, web, and browser, strengthening usability, asset management, and reliable Web3 interactions. Contributed to Xode Blockchain as a senior engineer, implementing secure and scalable Web3 capabilities that support decentralized application development. Developed Miming CAT, a cross-chain token bridge that enables secure and seamless transfer of digital assets across multiple blockchain networks, expanding interoperability within the ecosystem. Building Polaris, a CRM platform for casino operations designed to streamline business workflows, centralize operational data, and improve visibility across day-to-day processes.`,
      current: true,
      logo: '/images/experiences/blockspace.png'
    },
    {
      company: 'Independent Gig',
      position: 'Software Engineer',
      period: 'Contract / Gig',
      location: 'Remote',
      type: 'Gig',
      description: `Delivered Upwisy, an AI learning platform built as an independent gig with no client company on the delivery side. Integrated OpenAI endpoints, designed agentic workflow patterns, and applied RAG techniques to support AI-assisted course creation, content generation, and personalized learning experiences. Owned end-to-end feature development across backend services, data flows, and application delivery with Docker and GitHub CI/CD DevOps.`,
      current: false,
      logo: '/images/projects/upwisy-1.png'
    },
    {
      company: '4NEXGEN',
      position: 'Senior Software Engineer',
      period: 'Sep 2023 - Nov 2025 · 2 yrs 3 mos',
      location: 'Mandaue, Central Visayas, Philippines · Hybrid / On-site',
      type: 'Full-time',
      description: `Developed JINA-AI, an AI-driven virtual assistant platform that delivers intelligent chatbot solutions and business automation for end users and organizations. Designed and implemented core product features, optimized system performance, and validated quality to ensure stable, production-ready releases. Built Xterium, a secure blockchain wallet spanning mobile, web, and browser applications, establishing the foundation for multi-platform digital asset management across supported networks. Owned end-to-end feature development, from implementation and performance improvements to release readiness, while coordinating project tasks and delivery timelines across platforms.`,
      current: false,
      logo: '/images/experiences/4nexgen.png'
    },
    {
      company: 'HUMEDIT Co., Ltd',
      position: 'Software Engineer / IT Business Analyst',
      period: 'Feb 2023 - Aug 2023 · 7 mos',
      location: 'Chiyoda, Tokyo, Japan · On-site',
      type: 'Full-time',
      description: `Transitioned to an on-site role in Tokyo at HUMEDIT, the Japan-based counterpart of Human Incubator. Worked as a Software Engineer and IT Business Analyst on healthcare platforms including NIPT, dermatology reservation systems, and invoicing solutions. Collaborated with Japanese and Philippine teams to gather requirements, clarify business needs, and translate them into technical improvements. Delivered feature enhancements, resolved production issues, and strengthened clinic and operational workflows to meet quality and delivery expectations.`,
      current: false,
      logo: '/images/experiences/humedit.png'
    },
    {
      company: 'Human Incubator Inc.',
      position: 'Software Engineering Team Lead',
      period: 'Jun 2021 - Jan 2023 · 1 yr 8 mos',
      location: 'Cebu, Central Visayas, Philippines',
      type: 'Full-time',
      description: `Developed the Beauty System, a dermatology reservation platform enabling patients to book appointments, track treatments, manage billing, and monitor staff calendars. Designed and implemented an invoicing application for patient management and financial tracking across clinic operations. Coordinated engineering delivery, upheld code quality, and shipped solutions that improved operational efficiency, patient management, and user satisfaction within the company’s healthcare product ecosystem.`,
      current: false,
      logo: '/images/experiences/hii.png'
    },
    {
      company: 'Liteclerk Corporation',
      position: 'Software Engineer',
      period: 'Jan 2019 - Jun 2021 · 2 yrs 6 mos',
      location: 'Cebu City, Philippines',
      type: 'Full-time',
      description: `Enhanced Liteclerk Accounting Software into a more capable cloud-based SaaS platform for trading businesses, improving reporting, financial management, inventory workflows, and overall system reliability. Developed a new version of Liteclerk POS with real-time inventory tracking, sales and collection summaries, and operational reporting to support day-to-day business control. Also customized systems for clients, including Vaccine Tracker for vaccination eligibility monitoring and notifications, and IntelliStream for streaming subscription budgeting and optimization. Collaborated with teammates to integrate features, resolve technical issues, and deliver client-ready improvements across these products.`,
      current: false,
      logo: '/images/experiences/liteclerk.png'
    },
    {
      company: 'Innosoft Solutions Services Inc.',
      position: 'Software Developer',
      period: 'Apr 2016 - Jan 2019 · 2 yrs 10 mos',
      location: 'Cebu City, Philippines',
      type: 'Full-time',
      description: `Began as an intern and was later absorbed into a full-time Software Developer role. Developed the Innosoft website and CRM platform to manage leads, deliveries, and client support, with features for sales activity logging, issue tracking, and account executive performance monitoring. Designed and developed Easyfis Accounting Software, which later evolved into Liteclerk Accounting Software and formed the product foundation of Liteclerk Corporation.`,
      current: false,
      logo: '/images/experiences/innosoft.png'
    }
  ];

  certificates = [
    'Polkadot Blockchain Academy (Cyberport Hong Kong) Alumni',
  ];

  events = [
    'Polkadot Blockchain Academy - Wave 4 - Hong Kong 2024',
  ];

  youtubeVideos = [
    { id: 'video1', title: 'Let\'s build a blockchain', url: 'https://www.youtube.com/embed/QN__tf6gi3E?si=K2EGpNnIAyuDyhxg' },
    { id: 'video2', title: 'Blockchain Overview and Substrate', url: 'https://www.youtube.com/embed/JrS2_tbVLbg?si=YR1OHUay39CwGT9v' },
  ];

  socialLinks = [
    { platform: 'GitHub', url: 'https://github.com/oliverrigonan', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/noaholiverrigonan', icon: 'linkedin' },
    { platform: 'Email', url: 'mailto:oliverrigonan@gmail.com', icon: 'email' }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  getCategoryCount(category: string): number {
    if (category === 'All') {
      return this.projects.length;
    }
    return this.projects.filter(p => p.category === category).length;
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.closeMobileMenu();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextSlide(projectId: string, totalImages: number): void {
    const currentIndex = this.currentSlideIndex()[projectId] || 0;
    const newIndex = (currentIndex + 1) % totalImages;
    this.currentSlideIndex.update(indexes => ({ ...indexes, [projectId]: newIndex }));
  }

  previousSlide(projectId: string, totalImages: number): void {
    const currentIndex = this.currentSlideIndex()[projectId] || 0;
    const newIndex = (currentIndex - 1 + totalImages) % totalImages;
    this.currentSlideIndex.update(indexes => ({ ...indexes, [projectId]: newIndex }));
  }

  getCurrentSlideIndex(projectId: string): number {
    return this.currentSlideIndex()[projectId] || 0;
  }

  setSlideIndex(projectId: string, index: number): void {
    this.currentSlideIndex.update(indexes => ({ ...indexes, [projectId]: index }));
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled.set(scrollPosition > 50);
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = '/docs/cv.pdf';
    link.download = 'Noah_Oliver_Rigonan_CV.pdf';
    link.click();
  }

  isDarkTechIcon(tech: string): boolean {
    return tech === 'Cursor';
  }

  getTechIcon(tech: string): string {
    const iconMap: Record<string, string> = {
      'Rust': '<img src="/images/techstacks/rust.png" alt="Rust" />',
      'Polkadot': '<img src="/images/techstacks/polkadot.png" alt="Polkadot" />',
      'PolkadotJS': '<img src="/images/techstacks/polkadot.png" alt="PolkadotJS" />',
      'Polkadot XCM': '<img src="/images/techstacks/polkadot.png" alt="Polkadot XCM" />',
      'TypeScript': '<img src="/images/techstacks/typescript.png" alt="TypeScript" />',
      'JavaScript': '<img src="/images/techstacks/javascript.png" alt="JavaScript" />',
      'Angular': '<img src="/images/techstacks/angular.png" alt="Angular" />',
      'Vue': '<img src="/images/techstacks/javascript.png" alt="Vue" />',
      'NestJS': '<img src="/images/techstacks/nestjs.svg" alt="NestJS" />',
      'Ollama': '<img src="/images/techstacks/ollama.png" alt="Ollama" />',
      'LM Studio': '<img src="/images/techstacks/ollama.png" alt="LM Studio" />',
      'Docker': '<img src="/images/techstacks/docker.png" alt="Docker" />',
      'Ionic Framework': '<img src="/images/techstacks/ionic.png" alt="Ionic Framework" />',
      'Android': '<img src="/images/techstacks/android.webp" alt="Android" />',
      'iOS': '<img src="/images/techstacks/ios.png" alt="iOS" />',
      'Google Play Console': '<img src="/images/techstacks/google-play.webp" alt="Google Play Console" />',
      'App Store Connect': '<img src="/images/techstacks/appstore-connect.webp" alt="App Store Connect" />',
      'Chrome Extension': '<img src="/images/techstacks/javascript.png" alt="Chrome Extension" />',
      'FastAPI': '<img src="/images/techstacks/fastapi.svg" alt="FastAPI" />',
      'Python': '<img src="/images/techstacks/python.png" alt="Python" />',
      'Substrate': '<img src="/images/techstacks/substrate.png" alt="Substrate" />',
      'Substrate (Polkadot SDK)': '<img src="/images/techstacks/substrate.png" alt="Substrate" />',
      'Laravel': '<img src="/images/techstacks/laravel.png" alt="Laravel" />',
      'MongoDB': '<img src="/images/techstacks/mongodb.png" alt="MongoDB" />',
      'MySQL': '<img src="/images/techstacks/mysql.png" alt="MySQL" />',
      'PHP': '<img src="/images/techstacks/php.png" alt="PHP" />',
      'ASP.NET': '<img src="/images/techstacks/aspnet.webp" alt="ASP.NET" />',
      'ASP.NET MVC 5': '<img src="/images/techstacks/aspnet.webp" alt="ASP.NET MVC 5" />',
      '.NET Framework': '<img src="/images/techstacks/dotnet.png" alt=".NET Framework" />',
      'C#': '<img src="/images/techstacks/csharp.png" alt="C#" />',
      'WinForms': '<img src="/images/techstacks/dotnet.png" alt="WinForms" />',
      'LINQ': '<img src="/images/techstacks/csharp.png" alt="LINQ" />',
      'Microsoft SQL Server': '<img src="/images/techstacks/mssql.png" alt="Microsoft SQL Server" />',
      'OpenAI': '<img src="/images/techstacks/openai.png" alt="OpenAI" />',
      'Qdrant': '<img src="/images/techstacks/qdrant.png" alt="Qdrant" />',
      'ChromaDB': '<img src="/images/techstacks/chromadb.webp" alt="ChromaDB" />',
      'AWS': '<img src="/images/techstacks/docker.png" alt="AWS" />',
      'GitHub CI/CD DevOps': '<img src="/images/techstacks/github.svg" alt="GitHub CI/CD DevOps" />',
      'Proxmox': '<img src="/images/techstacks/docker.png" alt="Proxmox" />',
      'GitHub Copilot': '<img src="/images/techstacks/github.svg" alt="GitHub Copilot" />',
      'Claude Code': '<img src="/images/techstacks/claude.png" alt="Claude Code" />',
      'Cursor': '<img src="/images/techstacks/cursor.png" alt="Cursor" />',
    };
    return iconMap[tech] || '<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4 0-7.5-3.5-7.5-7.5S8 5.5 12 5.5s7.5 3.5 7.5 7.5-3.5 7.5-7.5 7.5z"/></svg>';
  }
}

