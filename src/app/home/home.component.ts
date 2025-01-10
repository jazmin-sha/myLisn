import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  showHeader = false;
  isSidebarOpen: boolean = false;
  @ViewChild('layout') layoutDiv!: ElementRef;
  @ViewChild('animatedHeading') animatedHeading!: ElementRef;
  @ViewChild('animatedParagraph') animatedParagraph!: ElementRef;
  @ViewChild('homeSection') homeSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('servicesSection') servicesSection!: ElementRef;
  @ViewChild('whyWeSection') whyWeSection!: ElementRef;
  @ViewChild('footerSection') footerSection!: ElementRef;

  constructor( private renderer: Renderer2) {}

  ngOnInit(): void {
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 5000);
    this.checkVisibility();
  }

  ngAfterViewInit(): void {
      const observer = new IntersectionObserver(
        (entries) => {
          const layoutEntry = entries[0];
          this.showHeader = layoutEntry.isIntersecting;
        },
        { threshold: 0.1 }
      );
  
      if (this.layoutDiv?.nativeElement) {
        observer.observe(this.layoutDiv?.nativeElement);
      }
  
      // Check if we are in the browser before using `window`
      window.addEventListener('scroll', () => this.checkVisibility());
      this.checkVisibility(); // Check visibility on load as well
  }
  

   // Function to check if an element is in the viewport
   isInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to add animation when elements come into view
  checkVisibility(): void {
    if (this.animatedHeading && this.isInViewport(this.animatedHeading?.nativeElement)) {
      this.renderer.addClass(this.animatedHeading?.nativeElement, 'animate');
    }

    if (this.animatedParagraph && this.isInViewport(this.animatedParagraph?.nativeElement)) {
      this.renderer.addClass(this.animatedParagraph?.nativeElement, 'animate');
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle state
  }

  scrollToSection(section: string): void {
    let element: ElementRef;

    switch (section) {
      case 'home':
        element = this.homeSection;
        break;
      case 'about':
        element = this.aboutSection;
        break;
      case 'services':
        element = this.servicesSection;
        break;
      case 'why-we':
        element = this.whyWeSection;
        break;
        case 'footer':
          element = this.footerSection;
          break;
      default:
        return;
    }

    // Ensure the element exists before scrolling
    if (element) {
      element?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
