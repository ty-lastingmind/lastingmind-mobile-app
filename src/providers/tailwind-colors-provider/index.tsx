import { cssInterop } from 'nativewind'
import { createContext, PropsWithChildren, useContext } from 'react'
import { TextStyle } from 'react-native'

interface TailwindColorsProviderValue {
  'screen-bg-primary': string
}

const Context = createContext<TailwindColorsProviderValue>({
  'screen-bg-primary': '',
})

export const useTailwindColors = () => useContext(Context)

interface TailwindColorsProviderInnerProps {
  screenBgPrimaryClassName: string
}

function ScreenColorsProviderInner({ children, ...props }: PropsWithChildren<TailwindColorsProviderInnerProps>) {
  const propsInterop = props as {
    screenBgPrimaryClassName: TextStyle
  }

  return (
    <Context.Provider
      value={{
        'screen-bg-primary': String(propsInterop.screenBgPrimaryClassName.color),
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
})

export const TailwindColorsProvider = ({ children }: PropsWithChildren) => {
  return (
    <TailwindColorsProviderInterop screenBgPrimaryClassName="text-screen-bg-primary">
      {children}
    </TailwindColorsProviderInterop>
  )
}
