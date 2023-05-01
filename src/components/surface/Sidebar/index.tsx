"use client";
import { AiTwotoneExperiment, AiOutlineDollar } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GiBed } from "react-icons/gi";
import { RiDashboardFill, RiCalendarTodoFill, RiGitRepositoryFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import Backdrop from "../../fundation/Backdrop";
import { createRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MenuItem from "../../fundation/MenuItem";

function Sidebar() {
  let isTableMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState<boolean>(isTableMid ? false : true);
  const sidebarRef = createRef<HTMLDivElement>();
  const pathname = usePathname();

  useEffect(() => {
    isTableMid ? setOpen(false) : setOpen(true);
  }, [isTableMid])

  useEffect(() => {
    isTableMid && setOpen(false)
  },[pathname])

  const navAnimation = isTableMid
    ? {
        open: { x: 0, width: "16rem", transition: { damping: 40 } },
        closed: { x: -256, width: 0, transition: { damping: 40, delay: 0.15 } },
      }
    : {
        open: { width: "16rem", transition: { damping: 40 } },
        closed: { width: "4rem", transition: { damping: 40 } },
      };

  return (
    <aside>
      <Backdrop isOpen={open} onClose={() => setOpen(false)}/>
      <motion.div
        ref={sidebarRef}
        variants={navAnimation}
        initial={{ x: isTableMid ? -256 : 0 }}
        animate={open ? "open" : "closed"}
        className="shadow-xl bg-gray-900 z-[999] max-w-[16rem] w-[16rem]
          overflow-hidden md:relative fixed h-screen"
      >
        <motion.span
          variants={{
            open: { opacity: 0, transition: { delay: 0.05 } },
            closed: { opacity: 100, transition: { delay: 0.2 } },
          }}
          animate={open ? "closed": "open"} 
          className="font-semibold text-lg p-6 block transition"
        >skateboard</motion.span>
        <div className="flex flex-col h-full">
          <nav className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            <MenuItem href="/dashboard" icon={RiDashboardFill}>Dashboard</MenuItem>
            <MenuItem href="/appointment" icon={RiCalendarTodoFill}>Consultas</MenuItem>
            <MenuItem href="/register" icon={RiGitRepositoryFill}>Registros</MenuItem>
            <MenuItem href="/exam" icon={AiTwotoneExperiment}>Exames</MenuItem>
            <MenuItem href="/finance" icon={AiOutlineDollar}>Financeiro</MenuItem>
            <MenuItem href="/hospitalization" icon={GiBed}>Internação</MenuItem>
            <MenuItem href="/report" icon={HiOutlineDocumentReport}>Relatórios</MenuItem>
          </nav>
        </div>
        <ArrowIcon isOpen={open} toogle={setOpen}/>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}><MdMenu size={25}/></div>
    </aside>
  )
}

export default Sidebar


interface IArrowIcon {
  isOpen: boolean, 
  toogle: (open: boolean) => void
} 
const ArrowIcon = ({isOpen, toogle}: IArrowIcon) => {
  return (
      <motion.div
        onClick={() => { toogle(!open) }}
        animate={isOpen ? { x: 0, y: 0, rotate: 0 } : { x: -0, y: -0, rotate: 180 }}
        transition={{ duration: 0 }}
        className="absolute w-fit h-fit md:block z-50 hidden right-4 bottom-4 cursor-pointer"
      >
        <IoIosArrowBack size={24} className="bg-slate-200 text-zinc-900 rounded-full p-0.5"/>
      </motion.div>
    )
}