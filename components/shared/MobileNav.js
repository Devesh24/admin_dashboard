import Image from 'next/image'
import { Sheet, SheetContent, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import Navlist from './Navlist'

const MobileNav = () => {
  return (
    <div className='md:hidden'>
        <Sheet>
            <SheetTrigger>
                <Image src={"/assets/icons/menu_white.svg"} alt='menu' width={30} height={30} />
            </SheetTrigger>
            <SheetContent side={'top'} className="bg-white">
                <SheetDescription>
                    <Navlist />
                </SheetDescription>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileNav