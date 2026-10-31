"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { createContext, useContext, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/components/ui/tabs-utils/motion-tokens";
import styles from "@/components/ui/tabs-utils/tabs.module.css";

type RootProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;
const TabsContext = createContext({ active: "", layoutId: "tabs" });

export function Tabs({ value, defaultValue, onValueChange, className, ...props }: RootProps) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const active = value ?? internal;
  const layoutId = useRef(`tabs-${Math.random().toString(36).slice(2)}`).current;
  const handleChange = (next: string) => { if (value === undefined) setInternal(next); onValueChange?.(next); };
  return <TabsContext.Provider value={{ active, layoutId }}><LayoutGroup id={layoutId}><TabsPrimitive.Root {...props} value={active} onValueChange={handleChange} className={[styles.root, className].filter(Boolean).join(" ")} /></LayoutGroup></TabsContext.Provider>;
}

export function TabsList({ className, ...props }: ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  const { active } = useContext(TabsContext); const reduced = useReducedMotion(); const viewport = useRef<HTMLDivElement>(null); const [overflow, setOverflow] = useState({ left:false, right:false });
  const update = () => { const node=viewport.current; if(!node)return; const max=node.scrollWidth-node.clientWidth; setOverflow({left:node.scrollLeft>1,right:node.scrollLeft<max-1}); };
  const scroll = (dir:number) => viewport.current?.scrollBy({left:dir*(viewport.current?.clientWidth??0)*.75,behavior:reduced?"instant":"smooth"});
  return <div className={styles.listShell} data-overflow={overflow.left||overflow.right} data-left={overflow.left} data-right={overflow.right}>{(overflow.left||overflow.right)&&<button type="button" aria-label="Scroll tabs left" className={`${styles.scrollButton} ${styles.scrollLeft}`} disabled={!overflow.left} onClick={()=>scroll(-1)}><ChevronLeft size={17}/></button>}<motion.div ref={viewport} layoutScroll className={styles.viewport} onScroll={update} onFocusCapture={()=>setTimeout(update,0)}><TabsPrimitive.List {...props} className={[styles.list,className].filter(Boolean).join(" ")} /></motion.div>{(overflow.left||overflow.right)&&<button type="button" aria-label="Scroll tabs right" className={`${styles.scrollButton} ${styles.scrollRight}`} disabled={!overflow.right} onClick={()=>scroll(1)}><ChevronRight size={17}/></button>}</div>;
}

export function TabsTrigger({ className, children, value, ...props }: ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  const { active } = useContext(TabsContext); const reduced = useReducedMotion();
  return <TabsPrimitive.Trigger {...props} value={value} data-value={value} className={[styles.trigger,className].filter(Boolean).join(" ")}>{active===value&&<motion.span className={styles.selection} layoutId="selection" transition={reduced?{duration:0}:motionTokens.spring.morph} aria-hidden="true" />}<span className={styles.triggerLabel}>{children}</span></TabsPrimitive.Trigger>;
}

export function TabsContent({ className, value, children, ...props }: ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  const { active } = useContext(TabsContext); const reduced = useReducedMotion(); const selected=active===value;
  return <AnimatePresence initial={false} mode="wait">{selected&&<TabsPrimitive.Content {...props} key={value} value={value} forceMount asChild><motion.div className={[styles.content,className].filter(Boolean).join(" ")} initial={{opacity:0,x:reduced?0:8}} animate={{opacity:1,x:0,transition:{duration:reduced?0.12:motionTokens.duration.standard}}} exit={{opacity:0,x:reduced?0:-6,transition:{duration:.12}}}>{children}</motion.div></TabsPrimitive.Content>}</AnimatePresence>;
}
export default Tabs;
