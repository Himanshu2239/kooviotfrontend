
"use client";
import { useState, useEffect } from "react";
import axios from "axios"; // Axios for API calls
import Image from "next/image";
import { User, Settings, LogOut, ChevronRight, FileText } from "lucide-react";
import { useRouter } from "next/navigation"; // For routing/navigation
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import companyLogo from "../../assets/companyLogo2.png";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const router = useRouter();
  const [salesperson, setSalesperson] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const salespersonDetails = localStorage.getItem("userDetails");
    if (salespersonDetails) {
      const salesManager = JSON.parse(salespersonDetails);
      setSalesperson(salesManager);
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleChangePasswordClick = () => {
    router.push("/changePassword");
  };

  const handleOnClickLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://kooviot.vercel.app/common/logoutUser",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userDetails");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isAdmin = salesperson.role === "admin";

  const handleRouter = () => {
    if (salesperson.role === 'admin')
      router.push('/admin');
    else if (salesperson.role === 'production')
      router.push('/production');
    else if (salesperson.role === 'salesperson')
      router.push('/');
    else
      router.push('/login');
  }

  // Handle report navigation
  const handleReportNavigation = (reportType, subType = null) => {
    const basePath = 'mes/report';
    if (subType) {
      router.push(`${basePath}/${reportType}/${subType}`);
    } else {
      router.push(`${basePath}/${reportType}`);
    }
  };

  return (
    <header className=" bg-purple-50 sticky  dark:bg-black top-0 z-20 text-foreground">
      <div className="flex justify-between items-center">
        <Image
          src={companyLogo}
          alt="Company Logo"
          width={120}
          height={40}
          className="dark:invert pt-1 pl-2 pb-1"
          style={{ height: 'auto' }}
          priority
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {/* Menu for larger screens */}
        <div className="hidden md:flex w-full max-w-2xl flex-row justify-between">
          <div onClick={() => handleRouter()} className="flex dark:hover:bg-inherit p-1 pr-2 rounded-lg cursor-pointer">
            <span>
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd" />
              </svg>
            </span>
            <button className="font-semibold pl-1 hover:underline text-[1.1rem]">Home</button>
          </div>

          <div className="flex dark:hover:bg-inherit p-1 pr-2 rounded-lg cursor-pointer" onClick={() => router.push('/OrderDetails')}>
            <span>
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd" />
              </svg>
            </span>
            <button className="font-semibold pl-1 hover:underline text-[1.1rem]">Order</button>
          </div>

          {/* Reports Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex dark:hover:bg-inherit p-1 pr-2 rounded-lg cursor-pointer">
                <span>
                  <span>
                    {/* <svg className="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 2a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8l-6-6H5Zm7 1.5L18.5 10H13a1 1 0 0 1-1-1V3.5ZM7 13h2v5H7v-5Zm4 0h2v3h-2v-3Zm4 0h2v4h-2v-4Z" />
                    </svg> */}
                    <span>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828a2 2 0 0 0-.586-1.414l-4.828-4.828A2 2 0 0 0 13.172 2H6zm7 1.5L18.5 9H14a1 1 0 0 1-1-1V3.5zM8 13h8v2H8v-2zm0 4h5v2H8v-2zm0-8h8v2H8V9z" />
                      </svg>
                    </span>

                  </span>
                </span>
                <button className="font-semibold pl-1 hover:underline text-[1.1rem]">Reports</button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => handleReportNavigation('production')}>
                Production
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Packing</span>
                  {/* <ChevronRight className="ml-auto h-4 w-4" /> */}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleReportNavigation('fgEntry')}>
                    FG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleReportNavigation('wipBgradeEntry')}>
                    Wip Bgrade
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleReportNavigation('wipRejectionEntry')}>
                    Wip Rejection
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleReportNavigation('fgRejectionEntry')}>
                    Fg Rejection
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem onClick={() => handleReportNavigation('mCodeStockReport')}>
                Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleReportNavigation('dispatchOut')}>
                Dispatch
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex dark:hover:bg-inherit p-1 pr-2 rounded-lg cursor-pointer" onClick={() => router.push('/IssueTracker')}>
            <span>
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
              </svg>
            </span>
            <button className="font-semibold pl-1 hover:underline text-[1.1rem]">Issues</button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} fixed top-[4.1rem] left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50`}>
          <div className="flex flex-col justify-start w-[60vw] rounded-br-lg bg-white dark:bg-black">
            <div onClick={() => handleRouter()} className="flex p-3 hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer">
              <span>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd" />
                </svg>
              </span>
              <button className="font-semibold rounded-lg pl-1 hover:underline text-[1.1rem]">Home</button>
            </div>

            <div className="flex p-3 hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer" onClick={() => router.push('/OrderDetails')}>
              <span>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd" />
                </svg>
              </span>
              <button className="font-semibold pl-1 hover:underline text-[1.1rem]">Order</button>
            </div>

            {/* Mobile Reports Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex p-3 hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer">
                  <span>
                    <FileText className="w-6 h-6 text-gray-800 dark:text-white" />
                  </span>
                  <button className="font-semibold pl-1 hover:underline text-[1.1rem]">Reports</button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => handleReportNavigation('production')}>
                  Production
                </DropdownMenuItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Packing</span>
                    {/* <ChevronRight className="ml-auto h-4 w-4" /> */}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleReportNavigation('packing', 'fg')}>
                      FG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleReportNavigation('packing', 'wip-bgrade')}>
                      Wip Bgrade
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleReportNavigation('packing', 'wip-rejection')}>
                      Wip Rejection
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleReportNavigation('packing', 'fg-rejection')}>
                      Fg Rejection
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuItem onClick={() => handleReportNavigation('dispatch')}>
                  Dispatch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex p-3 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-br-lg cursor-pointer" onClick={() => router.push('/IssueTracker')}>
              <span>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                  <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                </svg>
              </span>
              <button className="font-semibold pl-1 hover:underline text-[1.1rem]">Issues</button>
            </div>
          </div>
        </div>

        <div className="flex items-center mr-2 space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="mr-2"
          >
            {theme === "light" ? "🌙" : "☀️"}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="mr-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        salesperson.avatarUrl || "https://github.com/shadcn.png"
                      }
                      alt={salesperson.name}
                    />
                    <AvatarFallback>{salesperson.name}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {salesperson.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Job ID: {salesperson.jobId}
                    </p>
                    {!isAdmin && (
                      <p className="text-xs leading-none text-muted-foreground">
                        Area: {salesperson.area}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleChangePasswordClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {isAdmin && (
                  <DropdownMenuItem onClick={() => router.push('/changePasswordByAdmin')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin Change password</span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={handleOnClickLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}