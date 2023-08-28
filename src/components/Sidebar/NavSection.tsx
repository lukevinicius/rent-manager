import { ReactNode } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

type NavSectionProps = {
  title: string
  children: ReactNode
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple border="none">
        <AccordionItem className="border-none">
          <AccordionButton p="0" className="flex justify-between p-5">
            <p className="text-left font-bold text-zinc-50">{title}</p>
            <AccordionIcon className="text-zinc-50" />
          </AccordionButton>
          <AccordionPanel className="rounded-xl bg-zinc-900 px-5">
            <div>{children}</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}
