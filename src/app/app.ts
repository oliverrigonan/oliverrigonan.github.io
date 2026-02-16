import { Component, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
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

  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  projects = [
    {
      id: 'xterium-wallet',
      title: 'Xterium Wallet',
      description: 'A secure and versatile Web3 wallet for the Xode Blockchain, enabling users to manage digital assets across multiple networks (Xode, Assethub). Designed to deliver seamless blockchain finance experiences while prioritizing security and user-friendly interaction.',
      role: 'Lead Software Engineer',
      technologies: ['Ionic Framework', 'Angular', 'TypeScript', 'Polkadot', 'Android', 'iOS'],
      images: ['xterium-1.png', 'xterium-2.png', 'xterium-3.png']
    },
    {
      id: 'xode-blockchain',
      title: 'Xode Blockchain',
      description: 'A comprehensive blockchain platform with built-in on-chain governance, empowering developers to create Web3 games and enterprise decentralized applications (dApps). Supports development using Rust and Solidity and integrates with Polkadot to bridge gaming and business operations into the blockchain ecosystem.',
      role: 'Software Engineer',
      technologies: ['Rust', 'Substrate', 'Polkadot'],
      images: ['xode-1.png', 'xode-2.png', 'xode-3.png']
    },
    {
      id: 'jina-chatbot',
      title: 'JINA Virtual/AI Assistant - Chatbot',
      description: 'An AI-powered virtual assistant platform that enhances customer engagement and operational efficiency. Leveraging MetaAI LLaMA models, JINA enables businesses to deploy specialized virtual assistants tailored to handle specific operational tasks and address unique customer needs.',
      role: 'Lead Software Engineer',
      technologies: ['TypeScript', 'Python', 'FastAPI', 'MongoDB', 'Ollama'],
      images: ['jina-1.png', 'jina-2.png', 'jina-3.png']
    },
    {
      id: 'hiro-clinic',
      title: 'Hiro Clinic - Beauty System',
      description: 'A complete Web2 platform tailored for dermatology clinics in Japan. Streamlines daily clinic operations with integrated features for appointment scheduling, job order tracking, billing, patient management, and treatment planning—enhancing efficiency and patient experience.',
      role: 'Software Engineer',
      technologies: ['TypeScript', 'Angular', 'Laravel', 'MySQL'],
      images: ['hiro-1.png', 'hiro-2.png', 'hiro-3.png']
    },
    {
      id: 'intellistream',
      title: 'IntelliStream',
      description: 'A cloud-based budgeting and management tool designed to track streaming subscriptions, shows, and services. IntelliStream analyzes your usage to recommend the most cost-effective combination of streaming services, helping users save money and optimize subscriptions.',
      role: 'Software Developer',
      technologies: ['TypeScript', 'Angular', 'Laravel', 'MySQL'],
      images: ['intellistream-1.png', 'intellistream-2.png']
    },
    {
      id: 'vaccine-tracker',
      title: 'Vaccine Tracker',
      description: 'A proactive health management tool that monitors vaccination eligibility for you and your family. Sends timely notifications via phone or email when new opportunities arise, ensuring you stay up-to-date with required immunizations.',
      role: 'Software Developer',
      technologies: ['TypeScript', 'Angular', 'Laravel', 'MySQL'],
      images: ['vaccine-tracker-1.png', 'vaccine-tracker-2.png']
    },
    {
      id: 'liteclerk-fis',
      title: 'Liteclerk - Cloud Accounting Software',
      description: 'A robust cloud-based SaaS accounting platform built for trading businesses. Offers comprehensive functionality including customer and sales management, payables, supply-chain tracking, inventory and warehouse management, accounting, and finance—all accessible securely via the cloud.',
      role: 'Software Developer',
      technologies: ['JavaScript', 'C#', 'ASP.NET', 'Microsoft SQL Server'],
      images: ['liteclerk-fis-1.png', 'liteclerk-fis-2.png']
    },
    {
      id: 'liteclerk-pos',
      title: 'Liteclerk POS',
      description: 'A lightweight yet powerful Point-of-Sale system that simplifies operational workflows for businesses. Provides real-time inventory tracking, instant sales and collection summaries, and detailed reports to control operations, minimize losses, and optimize cash flow management.',
      role: 'Software Developer',
      technologies: ['C#', '.NET Framework', 'Microsoft SQL Server'],
      images: ['liteclerk-pos-1.png', 'liteclerk-pos-2.png']
    },
  ];

  experiences = [
    {
      company: 'Blockspace Corporation',
      position: 'Senior Software Engineer | Director',
      period: 'Dec 2025 - Present',
      location: 'Mandaue, Central Visayas, Philippines · On-site',
      type: 'Full-time',
      description: `Led a team of developers to maintain, enhance, and improve Xode Blockchain and Xterium projects. Ensured updates, features, and improvements were implemented efficiently while maintaining system stability and performance. Worked with team members to manage development tasks, resolve technical issues, and deliver high-quality solutions. Applied expertise in blockchain, AI, and Web3 technologies to improve the platforms' capabilities and user experience.`,
      current: true,
      logo: '/images/experiences/blockspace.png'
    },
    {
      company: '4NEXGEN',
      position: 'Senior Software Engineering Manager',
      period: 'Aug 2024 - Nov 2025 · 1 yr 4 mos',
      location: 'Mandaue, Central Visayas, Philippines · On-site',
      type: 'Full-time',
      description: `Managed a team of developers to start the development of Xterium, a blockchain wallet platform. Oversaw project planning, task assignments, and development processes while maintaining Xode Blockchain. Worked with cross-functional teams to meet deadlines and deliver functional mobile, web, and browser applications. Ensured high-quality standards and smooth workflow between teams and projects.`,
      current: false,
      logo: '/images/experiences/4nexgen.png'
    },
    {
      company: 'Blockspace Corporation',
      position: 'Senior Software Engineer',
      period: 'Sep 2023 - Jul 2024 · 11 mos',
      location: 'Mandaue, Central Visayas, Philippines · Hybrid',
      type: 'Full-time',
      description: `Led the development of JINA, an AI-driven virtual assistant platform, delivering advanced chatbot and business automation solutions. Was part of the development team for the initial version of Xode Blockchain, contributing to secure and scalable Web3 implementations. Worked with other engineers to plan features, implement functionality, and optimize system performance for client-ready solutions.`,
      current: false,
      logo: '/images/experiences/blockspace.png'
    },
    {
      company: 'HUMEDIT Co., Ltd',
      position: 'Software Engineer / IT Business Analyst',
      period: 'Feb 2023 - Aug 2023 · 7 mos',
      location: 'Chiyoda, Tokyo, Japan · On-site',
      type: 'Full-time',
      description: `Maintained, organized, and supported multiple projects including NIPT, dermatology reservation systems, and invoicing platforms. Worked with Japanese and Philippine teams, analyzed requirements, resolved technical and operational issues, and ensured smooth project delivery. Enhanced system workflows, performed debugging, and implemented improvements to optimize performance and usability.`,
      current: false,
      logo: '/images/experiences/humedit.png'
    },
    {
      company: 'Human Incubator Inc.',
      position: 'Software Engineer Team Lead',
      period: 'Jun 2021 - Jan 2023 · 1 yr 8 mos',
      location: 'Cebu, Central Visayas, Philippines',
      type: 'Full-time',
      description: `Led the development of a dermatology reservation app ("Beauty System") for patients to book appointments, monitor treatments, and track billing and points. Designed and implemented an invoicing application for patient management and financial tracking. Managed development projects, ensured code quality, and delivered high-quality software solutions that improved operational efficiency and user satisfaction.`,
      current: false,
      logo: '/images/experiences/hii.png'
    },
    {
      company: 'Liteclerk Corporation',
      position: 'Software Engineer',
      period: 'Jan 2019 - Jun 2021 · 2 yrs 6 mos',
      location: 'Cebu City, Philippines',
      type: 'Full-time',
      description: `Developed Liteclerk Cloud Accounting System and Liteclerk POS, providing businesses with scalable and cloud-based accounting and point-of-sale solutions. Implemented features that improved operational efficiency, reporting, and financial management. Worked with team members to maintain system reliability, integrate new functionalities, and provide technical support for clients.`,
      current: false,
      logo: '/images/experiences/liteclerk.png'
    },
    {
      company: 'Innosoft Solutions Services Inc.',
      position: 'Software Developer',
      period: 'Apr 2016 - Jan 2019 · 2 yrs 10 mos',
      location: 'Cebu City, Philippines',
      type: 'Full-time',
      description: `Built and maintained the Innosoft website and CRM system to manage leads, deliveries, and client support. Developed features for logging sales activities, tracking client concerns, and monitoring account executive performance. Improved operational efficiency and client satisfaction through automated processes and streamlined workflows.`,
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

  getTechIcon(tech: string): string {
    const iconMap: Record<string, string> = {
      'Rust': '<img src="/images/techstacks/rust.png" />',
      'Polkadot': '<img src="/images/techstacks/polkadot.png" />',
      'TypeScript': '<img src="/images/techstacks/typescript.png" />',
      'JavaScript': '<img src="/images/techstacks/javascript.png" />',
      'Angular': '<img src="/images/techstacks/angular.png" />',
      'NestJS': '<img src="/images/techstacks/nestjs.svg" />',
      'Ollama': '<img src="/images/techstacks/ollama.png" />',
      'Docker': '<img src="/images/techstacks/docker.png" />',
      'Ionic Framework': '<img src="/images/techstacks/ionic.png" />',
      'Android': '<img src="/images/techstacks/android.webp" />',
      'iOS': '<img src="/images/techstacks/ios.png" />',
      'FastAPI': '<img src="/images/techstacks/fastapi.svg" />',
      'Python': '<img src="/images/techstacks/python.png" />',
      'Substrate': '<img src="/images/techstacks/substrate.png" />',
      'Laravel': '<img src="/images/techstacks/laravel.png" />',
      'MongoDB': '<img src="/images/techstacks/mongodb.png" />',
      'MySQL': '<img src="/images/techstacks/mysql.png" />',
      'PHP': '<img src="/images/techstacks/php.png" />',
      'ASP.NET': '<img src="/images/techstacks/aspnet.webp" />',
      '.NET Framework': '<img src="/images/techstacks/dotnet.png" />',
      'C#': '<img src="/images/techstacks/csharp.png" />',
      'Microsoft SQL Server': '<img src="/images/techstacks/mssql.png" />',
    };
    return iconMap[tech] || '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4 0-7.5-3.5-7.5-7.5S8 5.5 12 5.5s7.5 3.5 7.5 7.5-3.5 7.5-7.5 7.5z"/></svg>';
  }
}

