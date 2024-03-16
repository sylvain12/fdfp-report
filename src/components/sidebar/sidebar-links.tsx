
import Link from 'next/link'
import { HomeIcon, ChartBarSquareIcon } from "@heroicons/react/24/outline"
import { TLink } from '@/types/navigation.type'

const links: TLink[] = [
    {name: 'Acceuil', href:'dashboard', icon: HomeIcon, active: true},
    {name: 'Rapports', href: 'reports', icon: ChartBarSquareIcon, active: false }
]

export default function SidebarLinks() {
    return (<>
        {links.map((link) => {
            const LinkIcon = link.icon
            return (
                <Link
                    className={`not-last-child:mb-24`}
                    title={link.name}
                    key={link.name}
                    href={link.href}>
                        <LinkIcon className='w-8' />
                </Link>
            )
        }) }
    </>)
}