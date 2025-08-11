import type { Tab } from '../../types'

type Props = {
  tab: Tab
  onClick: (tab: Tab) => void 
}

import Button from '../Button/Button'

export default function FilterTab(
  { onClick, tab }: Props
){
  const buttons: Tab[] = ["all", "active", "inactive"]
  
  return(
    <div className="flex justify-center gap-2">
      {buttons.map((button) =>
        <Button
          key={button}
          onClick={() => onClick(button)}
          isActive={tab ===  button}
        >
          <span className='text-xl'>
            {button}
          </span>
        </Button>)}
    </div>
  )
}
