
/**
 * Lógica GSAP genérica y reutilizable separada del componente principal.
 */
document.addEventListener("DOMContentLoaded", () => {
    if(typeof (window as any).gsap === 'undefined') return;
    const gsap = (window as any).gsap;

    // Fade Up Genérico para cualquier elemento en el sitio
    gsap.utils.toArray('.gsap-fade-up').forEach((element: any) => {
        gsap.fromTo(element, 
            { opacity: 0, y: 40, scale: 0.98 },
            { 
                opacity: 1, y: 0, scale: 1, duration: 1.2, 
                ease: "expo.out", 
                scrollTrigger: { 
                    trigger: element, 
                    start: "top 85%", 
                    toggleActions: "play reverse play reverse" 
                } 
            }
        );
    });
});