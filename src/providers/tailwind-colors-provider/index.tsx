import { cssInterop } from 'nativewind'
import { createContext, PropsWithChildren, useContext } from 'react'
import { TextStyle } from 'react-native'

interface TailwindColorsProviderValue {
  'screen-bg-primary': string
  'label-accent': string
}

const Context = createContext<TailwindColorsProviderValue>({
  'screen-bg-primary': '',
  'label-accent': '',
})

export const useTailwindColors = () => useContext(Context)

interface TailwindColorsProviderInnerProps {
  screenBgPrimaryClassName: string
  labelAccentClassName: string
}

function ScreenColorsProviderInner({ children, ...props }: PropsWithChildren<TailwindColorsProviderInnerProps>) {
  const propsInterop = props as {
    screenBgPrimaryClassName: TextStyle
    labelAccentClassName: TextStyle
  }

  return (
    <Context.Provider
      value={{
        'screen-bg-primary': String(propsInterop.screenBgPrimaryClassName.color),
        'label-accent': String(propsInterop.labelAccentClassName.color),
      }}
    >
      {children}
    </Context.Provider>
  )
}

const TailwindColorsProviderInterop = cssInterop(ScreenColorsProviderInner, {
  screenBgPrimaryClassName: {
    target: 'screenBgPrimaryClassName',
  },
  labelAccentClassName: {
    target: 'labelAccentClassName',
  },
})

export const TailwindColorsProvider = ({ children }: PropsWithChildren) => {
  return (
    <TailwindColorsProviderInterop
      labelAccentClassName="text-label-accent"
      screenBgPrimaryClassName="text-screen-bg-primary"
    >
      {children}
    </TailwindColorsProviderInterop>
  )
}
