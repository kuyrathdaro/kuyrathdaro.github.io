import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Skill {
    name: string;
    icon: string;
}

interface Project {
    slug: string;
    role: string;
    company: string;
    description: string;
    date: string;
    skills?: Skill[];
}

interface TimelineProps {
    experiences: Project[];
}

export function Timeline({ experiences }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    if (experiences.length === 0) {
        return (
            <div className="py-24 text-center border rounded-2xl border-dashed border-border/50 text-muted-foreground bg-secondary/20">
                <p className="text-lg font-medium">No projects added yet.</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative max-w-6xl mx-auto py-10 px-4 md:px-0">
            {/* Vertical Line - Centered on Desktop, Left on Mobile */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-border/40">
                <motion.div 
                    className="absolute top-0 left-0 w-full bg-primary origin-top"
                    style={{ height }}
                />
            </div>

            <div className="space-y-12 md:space-y-20">
                {experiences.map((experience, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div 
                            key={experience.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className={`relative flex flex-col md:flex-row items-center justify-between w-full pl-16 md:pl-0 ${
                                isEven ? 'md:flex-row-reverse' : ''
                            }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[26px] md:left-[calc(50%-6px)] top-10 md:top-1/2 md:-translate-y-1/2 h-3 w-3 rounded-full bg-background border-[3px] border-primary z-10 shadow-sm" />

                            {/* Blank spacer for desktop to maintain layout balance */}
                            <div className="hidden md:block w-[45%]">
                                <div className={`flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
                                    <span className="text-lg font-bold text-muted-foreground tracking-tight opacity-50 px-6 py-2 bg-secondary/30 rounded-full border border-border/50 backdrop-blur-sm">
                                        {experience.date}
                                    </span>
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="w-full md:w-[45%]">
                                {/* Mobile Date */}
                                <span className="text-sm font-semibold text-primary tracking-tight block md:hidden mb-4 bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20">
                                    {experience.date}
                                </span>
                                
                                <div className="block border border-border/40 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 bg-card/30 backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
                                    <div className="p-4 md:p-5 transition-colors duration-300">
                                        <div className="flex flex-col gap-1 mb-2">
                                            <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">{experience.role}</h3>
                                            <h4 className="text-sm font-medium text-primary/80">{experience.company}</h4>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{experience.description}</p>
                                        
                                        {experience.skills && experience.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                                {experience.skills.map((skill) => (
                                                    <span key={skill.name} className="px-2.5 py-0.5 text-[11px] font-semibold bg-secondary/50 text-secondary-foreground rounded-full border border-border/50 transition-colors hover:bg-secondary flex items-center gap-1">
                                                        <img 
                                                            src={`https://api.iconify.design/${skill.icon.replace(':', '/')}.svg`} 
                                                            alt={`${skill.name} icon`}
                                                            className="w-3 h-3 object-contain"
                                                        />
                                                        {skill.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
