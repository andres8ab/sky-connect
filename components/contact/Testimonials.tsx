import { AnimatedTestimonials } from "../ui/AnimatedTestimonials";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "La atención al detalle y las funciones innovadoras han transformado por completo nuestro flujo de trabajo. Es exactamente lo que estábamos buscando.",
      name: "Sarah Chen",
      designation: "Product Manager en TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "La implantación fue perfecta y los resultados superaron nuestras expectativas. La flexibilidad de la plataforma es notable.",
      name: "Michael Rodriguez",
      designation: "CTO en InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Esta solución ha mejorado notablemente la productividad de nuestro equipo. La interfaz intuitiva simplifica las tareas complejas.",
      name: "Emily Watson",
      designation: "Director de operaciones en CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Asistencia excepcional y funciones sólidas. Es raro encontrar un producto que cumpla todas sus promesas.",
      name: "James Kim",
      designation: "Ingeniero lider en DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "La escalabilidad y el rendimiento han cambiado las reglas del juego de nuestra organización. Muy recomendable para cualquier empresa en crecimiento.",
      name: "Lisa Thompson",
      designation: "VP de Technology en FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
