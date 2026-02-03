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
      description: 'The official Web3 wallet for the Xode Blockchain. Securely manage your digital assets and explore the next generation of multi-network (Xode, Assethub) blockchain finance.',
      role: 'Lead Software Engineer',
      technologies: ['Ionic Framework', 'Angular', 'TypeScript', 'Polkadot', 'Android', 'iOS'],
      images: ['xterium-1.png', 'xterium-2.png', 'xterium-3.png']
    },
    {
      id: 'xode-blockchain',
      title: 'Xode Blockchain',
      description: 'Xode is a blockchain platform with its own on-chain governance that aims to bring game development and businesses to Web3 and Polkadot. Enables developers to build web3 games and line-of-business (LOB) decentralized applications (dApps) using both Rust and Solidity.',
      role: 'Software Engineer',
      technologies: ['Rust', 'Substrate', 'Polkadot'],
      images: ['xode-1.png', 'xode-2.png', 'xode-3.png']
    },
    {
      id: 'jina-chatbot',
      title: 'JINA Virtual/AI Assistant - Chatbot',
      description: 'A virtual assistant platform that enhances customer engagement and streamlines business operations. Powered by MetaAI LLaMA models, it enables businesses to deploy specialized virtual assistants tailored to address specific operational challenges and customer needs.',
      role: 'Lead Software Engineer',
      technologies: ['TypeScript', 'Python', 'FastAPI', 'MongoDB', 'Ollama'],
      images: ['jina-1.png', 'jina-2.png', 'jina-3.png']
    },
    {
      id: 'hiro-clinic',
      title: 'Hiro Clinic - Beauty System',
      description: 'A comprehensive Web2-based platform from Japan, designed specifically for dermatology clinics. Streamlines clinic operations with reservation system, job order tracking, billing and collections management, patient management, and treatment planning.',
      role: 'Software Engineer',
      technologies: ['TypeScript', 'Angular', 'Laravel', 'MySQL'],
      images: ['hiro-1.png', 'hiro-2.png', 'hiro-3.png']
    },
    {
      id: 'intellistream',
      title: 'IntelliStream',
      description: 'A sophisticated cloud-based budgeting tool designed to efficiently track your streaming services, shows, and more. Accurately calculates the most cost-effective combination of streaming services.',
      role: 'Software Developer',
      technologies: ['TypeScript', 'Angular', 'Laravel', 'MySQL'],
      images: ['intellistream-1.png', 'intellistream-2.png']
    },
    {
      id: 'vaccine-tracker',
      title: 'Vaccine Tracker',
      description: 'Identifies opportunities for you to get vaccinated once you or your family members become eligible, and sends notifications to your phone or email as opportunities arise.',
      role: 'Software Developer',
      technologies: ['TypeScript', 'Angular', 'Laravel', 'MySQL'],
      images: ['vaccine-tracker-1.png', 'vaccine-tracker-2.png']
    },
    {
      id: 'liteclerk-fis',
      title: 'Liteclerk - Cloud Accounting Software',
      description: 'LITECLERK Cloud Accounting System is a cloud-based SAAS Application designed for robust enterprise transactions that includes customer and sales management, payables, supply- chain management, warehousing, accounting and finance for trading business.',
      role: 'Software Developer',
      technologies: ['JavaScript', 'C#', 'ASP.NET', 'Microsoft SQL Server'],
      images: ['liteclerk-fis-1.png', 'liteclerk-fis-2.png']
    },
    {
      id: 'liteclerk-pos',
      title: 'Liteclerk POS',
      description: 'Liteclerk POS was designed to be lite and simplified to make users easily adopt and understand the flow of operations yet powerful enough to gather vital information for making business decisions. By using POS, you can check your inventory in real-time and any given period. Sales and Collection Summaries can be generated instantly and accurately. With these reports, you will be able to control the operations of your business, minimize inventory pilferage, and monitor your cash.',
      role: 'Software Developer',
      technologies: ['C#', '.NET Framework', 'Microsoft SQL Server'],
      images: ['liteclerk-pos-1.png', 'liteclerk-pos-2.png']
    },
  ];

  experiences = [
    {
      company: 'Xode Blockchain',
      position: 'Senior Software Engineer / Blockchain Developer',
      period: 'Sep 2023 - Present · 2 yrs 5 mos',
      location: 'Mandaue, Central Visayas, Philippines · On-site',
      type: 'Full-time',
      description: 'Specializes in developing the Xode Blockchain by building Rust-based pallets with the Substrate Framework and implementing smart contracts using Ink!. Implements XCM protocols to enable seamless asset and message transfers between Xode, Polkadot, and AssetHub. Ensures secure, scalable, and efficient Web3 blockchain solutions through adherence to best practices and robust coding standards.',
      current: true,
      logo: '/images/experiences/xode.png'
    },
    {
      company: '4NEXGEN',
      position: 'Senior Software Engineering Manager',
      period: 'Aug 2024 - Nov 2025 · 1 yr 4 mos',
      location: 'Mandaue, Central Visayas, Philippines · On-site',
      type: 'Full-time',
      description: 'Manages a team delivering secure and scalable Web3 Blockchain solutions across the Polkadot and Solana ecosystems, including the Xode Blockchain. Oversees development of Rust-based pallets using the Substrate Framework and coordinates Ink! smart contract implementation. Develops off-chain programs to bridge Solana and Xode, while leveraging XCM for interoperability. Leads the creation of the Xterium Wallet for mobile, web, and browser platforms.',
      current: false,
      logo: '/images/experiences/4nexgen.png'
    },
    {
      company: 'Blockspace Corporation',
      position: 'Senior Software Engineer Technical Lead',
      period: 'Sep 2023 - Jul 2024 · 11 mos',
      location: 'Mandaue, Central Visayas, Philippines · Hybrid',
      type: 'Full-time',
      description: 'Leads and specializes in building secure, scalable, and interoperable decentralized applications using Rust and the Substrate Framework for the Polkadot ecosystem. Oversees the design and development of robust blockchain architectures. Utilizes large language models like Meta Llama with Python to develop advanced chatbot solutions.',
      current: false,
      logo: '/images/experiences/blockspace.png'
    },
    {
      company: 'HUMEDIT Co., Ltd',
      position: 'Senior Software Engineer / IT Business System Analyst / Team Lead',
      period: 'Feb 2023 - Aug 2023 · 7 mos',
      location: 'Chiyoda, Tokyo, Japan · On-site',
      type: 'Full-time',
      description: 'Drives the integration of organizational requirements with technical solutions. Oversees multiple projects including Non-Invasive Prenatal Testing (NIPT), Dermatology Reservation Apps, and PCR Management Systems. Leads system development using Angular Framework, PHP Laravel, and MySQL Database.',
      current: false,
      logo: '/images/experiences/humedit.png'
    },
    {
      company: 'Human Incubator Inc.',
      position: 'Senior Software Engineer Team Lead',
      period: 'Dec 2021 - Jan 2023 · 1 yr 2 mos',
      location: 'Cebu, Central Visayas, Philippines',
      type: 'Full-time',
      description: 'Leads development team maintaining and enhancing medical applications including NIPT, Dermatology Reservation App, and PCR Management System. Oversees use of Angular Framework, PHP Laravel, and Ionic Framework. Manages projects with Kanban methodology and Agile practices.',
      current: false,
      logo: '/images/experiences/hii.png'
    },
    {
      company: 'Human Incubator Inc.',
      position: 'Software Engineer',
      period: 'Jun 2021 - Dec 2021 · 7 mos',
      location: 'Cebu, Central Visayas, Philippines',
      type: 'Full-time',
      description: 'Develops the Dermatology Reservation App and supports development of the PCR Management System. Utilizes Angular Framework, PHP Laravel, and MySQL Database to build reliable and high-quality software solutions.',
      current: false,
      logo: '/images/experiences/hii.png'
    },
    {
      company: 'EASYFIS CORPORATION',
      position: 'Software Developer',
      period: 'Jan 2019 - Jun 2021 · 2 yrs 6 mos',
      location: 'Philippines',
      type: 'Full-time',
      description: 'Develops and maintains dynamic software applications using Angular Framework, ASP.NET (.NET Core, Web API Services), WinForms, and Microsoft SQL Database. Leads development of diverse systems from point-of-sale (POS) to cloud-based accounting and payroll systems.',
      current: false,
      logo: '/images/experiences/liteclerk.png'
    },
    {
      company: 'Innosoft Solutions Services Inc.',
      position: 'Software Developer',
      period: 'Apr 2016 - Jan 2019 · 2 yrs 10 mos',
      location: 'Cebu City, Philippines',
      type: 'Full-time',
      description: 'Specializes in developing advanced cloud-based applications with Java Spring Framework and Oracle Database. Delivers projects in CRM, cloud-based accounting systems, and application integration. Proficient in ASP.NET Framework, MVC, WebAPI Services, and Microsoft SQL Server.',
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
    // Create a dummy resume PDF download
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Noah_Oliver_Rigonan_Resume.pdf';
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

