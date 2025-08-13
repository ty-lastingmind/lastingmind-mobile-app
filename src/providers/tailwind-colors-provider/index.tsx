import { cssInterop } from 'nativewind'
import { createContext, PropsWithChildren, useContext } from 'react'
import { TextStyle } from 'react-native'

interface TailwindColorsProviderValue {
  accent: string
  red: string
  'label-primary': string
  'label-secondary': string
  'label-accent': string
  'fill-accent': string
  'bg-vibrant-primary': string
  'bg-primary': string
  'bg-secondary': string
  'bg-tertiary': string
  miscellaneous: string
  'miscellaneous-topic-stroke': string
  'miscellaneous-component': string
}

const Context = createContext<TailwindColorsProviderValue>({
  accent: '',
  red: '',
  'label-primary': '',
  'label-secondary': '',
  'label-accent': '',
  'fill-accent': '',
  'bg-vibrant-primary': '',
  'bg-primary': '',
  'bg-secondary': '',
  'bg-tertiary': '',
  miscellaneous: '',
  'miscellaneous-topic-stroke': '',
  'miscellaneous-component': '',
})

export const useTailwindColors = () => useContext(Context)

interface TailwindColorsProviderInnerProps {
  accentClassName: string
  redClassName: string
  labelPrimaryClassName: string
  labelSecondaryClassName: string
  labelAccentClassName: string
  fillAccentClassName: string
  bgVibrantPrimaryClassName: string
  bgPrimaryClassName: string
  bgSecondaryClassName: string
  bgTertiaryClassName: string
  miscellaneousClassName: string
  miscellaneousTopicStrokeClassName: string
  miscellaneousComponentClassName: string
}

function ScreenColorsProviderInner({ children, ...props }: PropsWithChildren<TailwindColorsProviderInnerProps>) {
  const propsInterop = props as {
    accentClassName: TextStyle
    redClassName: TextStyle
    labelPrimaryClassName: TextStyle
    labelSecondaryClassName: TextStyle
    labelAccentClassName: TextStyle
    fillAccentClassName: TextStyle
    bgVibrantPrimaryClassName: TextStyle
    bgPrimaryClassName: TextStyle
    bgSecondaryClassName: TextStyle
    bgTertiaryClassName: TextStyle
    miscellaneousClassName: TextStyle
    miscellaneousTopicStrokeClassName: TextStyle
    miscellaneousComponentClassName: TextStyle
  }

  return (
    <Context.Provider
      value={{
        accent: String(propsInterop.accentClassName.color),
        red: String(propsInterop.redClassName.color),
        'label-primary': String(propsInterop.labelPrimaryClassName.color),
        'label-secondary': String(propsInterop.labelSecondaryClassName.color),
        'label-accent': String(propsInterop.labelAccentClassName.color),
        'fill-accent': String(propsInterop.fillAccentClassName.color),
        'bg-vibrant-primary': String(propsInterop.bgVibrantPrimaryClassName.color),
        'bg-primary': String(propsInterop.bgPrimaryClassName.color),
        'bg-secondary': String(propsInterop.bgSecondaryClassName.color),
        'bg-tertiary': String(propsInterop.bgTertiaryClassName.color),
        miscellaneous: String(propsInterop.miscellaneousClassName.color),
        'miscellaneous-topic-stroke': String(propsInterop.miscellaneousTopicStrokeClassName.color),
        'miscellaneous-component': String(propsInterop.miscellaneousComponentClassName.color),
      }}
    >
      {children}
    </Context.Provider>
  )
}

const TailwindColorsProviderInterop = cssInterop(ScreenColorsProviderInner, {
  accentClassName: {
    target: 'accentClassName',
  },
  redClassName: {
    target: 'redClassName',
  },
  labelPrimaryClassName: {
    target: 'labelPrimaryClassName',
  },
  labelSecondaryClassName: {
    target: 'labelSecondaryClassName',
  },
  labelAccentClassName: {
    target: 'labelAccentClassName',
  },
  fillAccentClassName: {
    target: 'fillAccentClassName',
  },
  bgVibrantPrimaryClassName: {
    target: 'bgVibrantPrimaryClassName',
  },
  bgPrimaryClassName: {
    target: 'bgPrimaryClassName',
  },
  bgSecondaryClassName: {
    target: 'bgSecondaryClassName',
  },
  bgTertiaryClassName: {
    target: 'bgTertiaryClassName',
  },
  miscellaneousClassName: {
    target: 'miscellaneousClassName',
  },
  miscellaneousTopicStrokeClassName: {
    target: 'miscellaneousTopicStrokeClassName',
  },
  miscellaneousComponentClassName: {
    target: 'miscellaneousComponentClassName',
  },
})

export const TailwindColorsProvider = ({ children }: PropsWithChildren) => {
  return (
    <TailwindColorsProviderInterop
      accentClassName="text-accent"
      redClassName="text-red"
      labelPrimaryClassName="text-label-primary"
      labelSecondaryClassName="text-label-secondary"
      labelAccentClassName="text-label-accent"
      fillAccentClassName="text-fill-accent"
      bgVibrantPrimaryClassName="text-bg-vibrant-primary"
      bgPrimaryClassName="text-bg-primary"
      bgSecondaryClassName="text-bg-secondary"
      bgTertiaryClassName="text-bg-tertiary"
      miscellaneousClassName="text-miscellaneous"
      miscellaneousTopicStrokeClassName="text-miscellaneous-topic-stroke"
      miscellaneousComponentClassName="text-miscellaneous-component"
    >
      {children}
    </TailwindColorsProviderInterop>
  )
}
