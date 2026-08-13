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
  galleryProject = signal<(typeof this.projects)[number] | null>(null);
  galleryIndex = signal(0);
  resumeOpen = signal(false);
  readonly cardTechLimit = 4;

  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Gigs', href: '#gigs' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  profileBio = `Senior Software Engineer trusted to design, build, and deliver production software across full stack, AI, and Web3.`;

  expertiseParagraphs = [
    `I deliver high-impact software with strong ownership from architecture and implementation to performance, quality, and release. My focus is building systems that are reliable under real usage, clear in execution, and ready for scale.`,
    `I bring proven depth across full stack platforms, AI-powered products, and blockchain applications, including wallets, cross-chain tooling, virtual assistants, and enterprise systems. Teams and clients can count on clean delivery, solid engineering judgment, and solutions that move business goals forward.`,
    `Whether the need is a new product, a complex feature set, or a production-ready platform, I work with precision and speed to turn requirements into software that performs, ships, and creates lasting value.`,
  ];

  projects = [
    {
      id: 'polaris',
      title: 'Polaris - Casino Junket CRM',
      summary: 'A Web2 CRM for casino junket operations, covering cage management, games, commissions, accounts, and live operational dashboards.',
      description: 'Polaris is a casino junket CRM built for day-to-day operations management. It centralizes accounts, cage management, game tracking, and commission workflows in one platform. The operations dashboard provides live visibility into cash position, chip inventory, buy-ins, and active games, with breakdowns for guest, staff, and company deposits plus rolling and inventory analytics to support faster, clearer decision-making on the floor.',
      role: 'Senior Software Engineer',
      engagement: 'Company',
      company: 'Blockspace Corporation',
      technologies: ['Angular', 'TypeScript', 'NestJS', 'MongoDB', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['polaris-2.png', 'polaris-3.png', 'polaris-4.png', 'polaris-5.png', 'polaris-6.png', 'polaris-7.png', 'polaris-1.png'],
      category: 'Web2'
    },
    {
      id: 'upwisy',
      title: 'Upwisy - AI Learning Platform',
      summary: 'An AI learning platform for creating and delivering courses, with OpenAI integrations, agentic workflows, and RAG-powered content experiences.',
      description: 'An independent gig project focused on deep AI product work. Upwisy is an AI-powered learning platform for creating and delivering online courses, with OpenAI endpoint integrations, agentic workflow patterns, and RAG techniques for smarter content generation, personalized learning paths, and interactive learning experiences.',
      role: 'Software Engineer',
      engagement: 'Gig',
      technologies: ['Python', 'FastAPI', 'OpenAI', 'Angular', 'MongoDB', 'Qdrant', 'ChromaDB', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['upwisy-1.png', 'upwisy-2.png', 'upwisy-3.png', 'upwisy-4.png', 'upwisy-5.png'],
      category: 'AI',
      links: [
        { label: 'Upwisy Website', url: 'https://upwisy.com/' },
        { label: 'Upwisy App', url: 'https://app.upwisy.com/' }
      ]
    },
    {
      id: 'miming',
      title: 'Miming CAT (Cross Access Token)',
      summary: 'A cross-chain token bridge that moves digital assets securely across multiple blockchain networks with strong interoperability focus.',
      description: 'A cross-chain token bridge solution that enables seamless transfer of digital assets across multiple blockchain networks. Miming CAT provides a secure and efficient way to move tokens between different chains, enhancing interoperability and expanding the possibilities for decentralized applications (dApps) and users in the blockchain ecosystem.',
      role: 'Lead Software Engineer',
      engagement: 'Company',
      technologies: ['TypeScript', 'NestJS', 'Angular', 'MongoDB', 'PolkadotJS', 'Polkadot XCM', 'Docker', 'GitHub CI/CD DevOps'],
      images: ['miming-1.png', 'miming-2.png', 'miming-3.png', 'miming-4.png', 'miming-5.png'],
      category: 'Web3',
      links: [
        { label: 'Miming DApp', url: 'https://dapp.miming.net/' }
      ]
    },
    {
      id: 'xterium-wallet',
      title: 'Xterium Wallet',
      summary: 'A multi-platform Web3 wallet for managing digital assets across Xode and Assethub, available on mobile, web, and browser extension.',
      description: 'A secure and versatile Web3 wallet for the Xode Blockchain, enabling users to manage digital assets across multiple networks (Xode, Assethub). Designed to deliver seamless blockchain finance experiences while prioritizing security and user-friendly interaction across mobile apps, web, and browser extension surfaces.',
      role: 'Lead Software Engineer',
      engagement: 'Company',
      technologies: ['Angular', 'Ionic Framework', 'PolkadotJS', 'Google Play Console', 'App Store Connect', 'Chrome Extension'],
      images: ['xterium-1.png', 'xterium-2.png', 'xterium-3.png'],
      category: 'Mobile App',
      links: [
        { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.xterium.wallet&hl=en' },
        { label: 'App Store', url: 'https://apps.apple.com/ph/app/xterium/id6745164228' }
      ]
    },
    {
      id: 'xode-blockchain',
      title: 'Xode Blockchain',
      summary: 'A Polkadot-connected blockchain platform with on-chain governance for Web3 games and enterprise decentralized applications.',
      description: 'A comprehensive blockchain platform with built-in on-chain governance, empowering developers to create Web3 games and enterprise decentralized applications (dApps). Supports development using Rust and Solidity and integrates with Polkadot to bridge gaming and business operations into the blockchain ecosystem.',
      role: 'Software Engineer',
      engagement: 'Company',
      technologies: ['Rust', 'Substrate (Polkadot SDK)'],
      images: ['xode-1.png', 'xode-2.png', 'xode-3.png'],
      category: 'Web3',
      links: [
        { label: 'Xode Website', url: 'https://xode.net/' },
        { label: 'Blockscanner', url: 'https://blockscanner.xode.net/' },
        { label: 'Xode Node', url: 'https://node.xode.net/' },
        { label: 'Polkadot.js Apps', url: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-rpcnode.xode.net#/explorer' }
      ]
    },
    {
      id: 'jina-chatbot',
      title: 'JINA Virtual/AI Assistant - Chatbot',
      summary: 'An AI virtual assistant platform for deploying specialized chatbots focused on customer engagement and operational tasks.',
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
      summary: 'A dermatology clinic platform for Japan covering appointments, billing, patient records, and treatment planning in one system.',
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
      summary: 'A client-customized streaming subscription manager that tracks plans and recommends more cost-effective combinations.',
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
      summary: 'A client-customized health tool that tracks vaccination eligibility and sends timely phone or email reminders.',
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
      summary: 'A cloud accounting SaaS for trading businesses covering sales, payables, inventory, warehouse, and financial workflows.',
      description: 'A robust cloud-based SaaS accounting platform built for trading businesses. Offers comprehensive functionality including customer and sales management, payables, supply-chain tracking, inventory and warehouse management, accounting, and finance, all accessible securely via the cloud.',
      role: 'Software Developer',
      engagement: 'Company',
      technologies: ['C#', 'ASP.NET MVC 5', 'JavaScript', 'Microsoft SQL Server', 'LINQ'],
      images: ['liteclerk-fis-1.png', 'liteclerk-fis-2.png'],
      category: 'Web2',
      links: [
        { label: 'Liteclerk Website', url: 'https://www.liteclerk.com/' },
        { label: 'Liteclerk Demo', url: 'https://demo.liteclerk.com/' }
      ]
    },
    {
      id: 'liteclerk-pos',
      title: 'Liteclerk POS',
      summary: 'A point-of-sale system with real-time inventory, sales tracking, and operational reporting for day-to-day business control.',
      description: 'A lightweight yet powerful Point-of-Sale system that simplifies operational workflows for businesses. Provides real-time inventory tracking, instant sales and collection summaries, and detailed reports to control operations, minimize losses, and optimize cash flow management.',
      role: 'Software Developer',
      engagement: 'Company',
      technologies: ['C#', '.NET Framework', 'WinForms', 'Microsoft SQL Server', 'LINQ'],
      images: ['liteclerk-pos-1.png', 'liteclerk-pos-2.png'],
      category: 'Desktop App',
      links: [
        { label: 'Liteclerk Website', url: 'https://www.liteclerk.com/' },
        { label: 'Liteclerk Demo', url: 'https://demo.liteclerk.com/' }
      ]
    },
  ];

  dailyTools = [
    {
      key: 'GitHub Copilot',
      name: 'GitHub Copilot',
      accent: 'from-slate-100/20 to-slate-500/10',
      border: 'hover:border-slate-300/50',
      glow: 'group-hover:shadow-slate-400/20',
      invert: false
    },
    {
      key: 'Claude Code',
      name: 'Claude Code',
      accent: 'from-orange-400/20 to-amber-500/10',
      border: 'hover:border-orange-400/50',
      glow: 'group-hover:shadow-orange-400/20',
      invert: false
    },
    {
      key: 'Cursor',
      name: 'Cursor',
      accent: 'from-cyan-400/20 to-blue-500/10',
      border: 'hover:border-cyan-400/50',
      glow: 'group-hover:shadow-cyan-400/20',
      invert: true
    },
    {
      key: 'OpenAI',
      name: 'OpenAI',
      accent: 'from-emerald-400/20 to-teal-500/10',
      border: 'hover:border-emerald-400/50',
      glow: 'group-hover:shadow-emerald-400/20',
      invert: false
    },
    {
      key: 'Ollama',
      name: 'Ollama',
      accent: 'from-violet-400/20 to-purple-500/10',
      border: 'hover:border-violet-400/50',
      glow: 'group-hover:shadow-violet-400/20',
      invert: false
    },
  ];

  heroTechs = [
    { key: 'Angular', label: 'Angular' },
    { key: 'Ionic Framework', label: 'Ionic' },
    { key: 'NestJS', label: 'NestJS' },
    { key: 'FastAPI', label: 'FastAPI' },
    { key: 'ASP.NET', label: 'ASP.NET' },
    { key: 'ASP.NET Core', label: 'ASP.NET Core' },
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
      period: 'Sep 2023 - Present',
      location: 'Mandaue, Central Visayas, Philippines · On-site',
      type: 'Full-time',
      description: `
      Designed, developed, and delivered scalable software solutions across AI, blockchain, web, mobile, and business applications. Worked across the full software development lifecycle, including system architecture, application and API development, database design, third-party integrations, testing, deployment, troubleshooting, and production support. Collaborated with technical and business teams to translate requirements into reliable, scalable, and maintainable solutions.

      Led the development of Xterium, a secure multi-platform blockchain wallet supporting mobile, web, and browser applications. Contributed to Xode Blockchain by implementing secure and scalable blockchain capabilities that supported decentralized applications, digital asset management, and ecosystem services.

      Developed JINA-AI, an AI-powered virtual assistant platform providing intelligent chatbot capabilities and AI-driven business solutions, with a focus on core functionality, system improvements, performance optimization, integrations, and production readiness. Also led the development of Polaris, a CRM and business management platform designed for casino operations, centralizing operational data, streamlining business workflows, and improving visibility across day-to-day business processes. Contributed to technical planning, feature delivery, system reliability, code quality, and product improvement across these solutions.`,
      current: true,
      logo: '/images/experiences/blockspace.png'
    },
    {
      company: 'HUMEDIT Co., Ltd',
      position: 'Software Engineer / IT Business Analyst',
      period: 'Feb 2023 - Aug 2023 · 7 mos',
      location: 'Chiyoda, Tokyo, Japan · On-site',
      type: 'Full-time',
      description: `
      Worked as a Software Engineer and IT Business Analyst supporting healthcare and clinic management platforms in Japan. Combined software development responsibilities with business analysis to understand operational requirements and translate them into practical technical solutions.

      Worked on healthcare platforms including NIPT, dermatology reservation systems, and invoicing applications. Developed new features, improved existing workflows, resolved production issues, and supported the continuous enhancement of business applications.

      Collaborated closely with Japanese and Philippine teams to gather and clarify requirements, discuss technical solutions, coordinate development activities, and ensure that implemented features aligned with business and operational needs.`,
      current: false,
      logo: '/images/experiences/humedit.png'
    },
    {
      company: 'Human Incubator Inc.',
      position: 'Software Engineering Team Lead',
      period: 'Jun 2021 - Jan 2023 · 1 yr 8 mos',
      location: 'Cebu, Central Visayas, Philippines',
      type: 'Full-time',
      description: `
      Led software engineering activities for healthcare and clinic management applications, taking responsibility for technical implementation, development coordination, code quality, and delivery.

      Designed and developed the Beauty System, a dermatology reservation platform supporting appointment scheduling, treatment management, billing, and staff calendar management. Also designed and implemented an invoicing and patient management application supporting financial and operational workflows.

      Worked closely with business stakeholders and development teams to analyze requirements, design solutions, coordinate development activities, and resolve technical and production issues.

      Focused on delivering reliable and maintainable software while improving application performance, usability, and overall operational efficiency.`,
      current: false,
      logo: '/images/experiences/hii.png'
    },
    {
      company: 'Liteclerk Corporation',
      position: 'Software Engineer',
      period: 'Jan 2019 - Jun 2021 · 2 yrs 6 mos',
      location: 'Cebu City, Philippines',
      type: 'Full-time',
      description: `
      Worked on the development and enhancement of business management, accounting, and point-of-sale systems for trading and commercial organizations.

      Contributed to the evolution of Liteclerk Accounting Software into a cloud-based SaaS platform, improving financial management, reporting, inventory management, and day-to-day business workflows.

      Developed a new version of Liteclerk POS with real-time inventory tracking, sales and collection monitoring, and operational reporting to help businesses manage their daily operations more effectively.

      Also developed and customized software solutions based on client requirements, including Vaccine Tracker for vaccination eligibility monitoring and notifications and IntelliStream for streaming subscription budgeting and management.

      Worked across software development, database design, system integration, troubleshooting, deployment, and production support while collaborating with teams to deliver reliable and maintainable solutions.`,
      current: false,
      logo: '/images/experiences/liteclerk.png'
    },
    {
      company: 'Innosoft Solutions Services Inc.',
      position: 'Software Developer',
      period: 'Apr 2016 - Jan 2019 · 2 yrs 10 mos',
      location: 'Cebu City, Philippines',
      type: 'Full-time',
      description: `
      Started as a software development intern and transitioned into a full-time Software Developer role, gaining experience in developing web-based business applications and enterprise software solutions.

      Designed and developed the Innosoft corporate website and CRM platform for managing leads, deliveries, customer support, sales activities, issue tracking, and account executive performance.

      Designed and developed Easyfis Accounting Software, which later evolved into Liteclerk Accounting Software and became the foundation of Liteclerk Corporation's accounting product.

      Worked across the software development lifecycle, including application design, full-stack development, database development, testing, troubleshooting, deployment, and system maintenance.

      Collaborated with business teams and clients to understand requirements and deliver software solutions that addressed operational and business needs.`,
      current: false,
      logo: '/images/experiences/innosoft.png'
    }
  ];

  gigs = [
    {
      id: 'upwisy',
      title: 'Upwisy - AI Learning Platform',
      role: 'Software Engineer',
      period: 'Contract / Gig',
      location: 'Remote',
      description: `An independent gig focused on deep AI product work. Built Upwisy as an AI-powered learning platform for creating and delivering online courses, with OpenAI endpoint integrations, agentic workflow patterns, and RAG techniques for smarter content generation, personalized learning paths, and interactive learning experiences.`,
      technologies: ['Python', 'FastAPI', 'OpenAI', 'Angular', 'MongoDB', 'Qdrant', 'ChromaDB', 'Docker', 'GitHub CI/CD DevOps'],
      image: 'upwisy-1.png',
      links: [
        { label: 'Upwisy Website', url: 'https://upwisy.com/' },
        { label: 'Upwisy App', url: 'https://app.upwisy.com/' }
      ]
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

  descriptionParagraphs(description: string): string[] {
    return description
      .split(/\n\s*\n/)
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0);
  }

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

  openGallery(project: (typeof this.projects)[number], event?: Event): void {
    event?.stopPropagation();
    this.galleryProject.set(project);
    this.galleryIndex.set(this.getCurrentSlideIndex(project.id));
    document.body.style.overflow = 'hidden';
  }

  closeGallery(): void {
    this.galleryProject.set(null);
    if (!this.resumeOpen()) {
      document.body.style.overflow = '';
    }
  }

  nextGalleryImage(): void {
    const project = this.galleryProject();
    if (!project || project.images.length <= 1) {
      return;
    }
    this.galleryIndex.update(index => (index + 1) % project.images.length);
  }

  previousGalleryImage(): void {
    const project = this.galleryProject();
    if (!project || project.images.length <= 1) {
      return;
    }
    this.galleryIndex.update(index => (index - 1 + project.images.length) % project.images.length);
  }

  setGalleryIndex(index: number): void {
    this.galleryIndex.set(index);
  }

  @HostListener('window:keydown', ['$event'])
  onWindowKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.galleryProject()) {
        this.closeGallery();
      }
      if (this.resumeOpen()) {
        this.closeResume();
      }
      return;
    }

    if (!this.galleryProject()) {
      return;
    }

    if (event.key === 'ArrowRight') {
      this.nextGalleryImage();
    } else if (event.key === 'ArrowLeft') {
      this.previousGalleryImage();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled.set(scrollPosition > 50);
  }

  openResume(): void {
    this.resumeOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeResume(): void {
    this.resumeOpen.set(false);
    if (!this.galleryProject()) {
      document.body.style.overflow = '';
    }
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = '/docs/cv.pdf';
    link.download = 'Noah_Oliver_Rigonan_CV.pdf';
    link.click();
  }

  getCardTechnologies(technologies: string[]): string[] {
    return technologies.slice(0, this.cardTechLimit);
  }

  getHiddenTechCount(technologies: string[]): number {
    return Math.max(technologies.length - this.cardTechLimit, 0);
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
      'ASP.NET Core': '<img src="/images/techstacks/aspnet.webp" alt="ASP.NET Core" />',
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

