"use client"


import { Moon } from "lucide-react"
import { useTheme } from 'next-themes'
function NavBar() {
  return (
    <nav className='flex flex-row justify-between shadow-md rounded-lg h-[50px] items-center  dark:bg-slate-800 p-4'>
      <div>
        Where in the World?
      </div>
      <div>
        <ToggleButton />
      </div>
    </nav>
  )
}

const ToggleButton = () => {

  const { setTheme, theme } = useTheme()

  const handleThemeChange = () => {

    if (theme === "dark" || theme === "system") {
      console.log("light")
      setTheme("light")
    }
    else if (theme === "light" || theme === "system") {
      setTheme("dark")
    }
    else {
      setTheme("system")
    }
  }
  return (
    <>

      <button onClick={handleThemeChange} className='flex'>

        <Moon />
        <span>{theme === "dark" ? "Light" : "Dark"} Mood</span>
      </button>

    </>
  )
}
export default NavBar