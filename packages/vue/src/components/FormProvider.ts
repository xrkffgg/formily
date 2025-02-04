import { provide, defineComponent, toRaw, DefineComponent } from 'vue-demi'
import { FormSymbol } from '../shared/context'
import { IProviderProps } from '../types'
import { useAttach } from '../hooks/useAttach'
import h from '../shared/h'
import { Fragment } from '../shared/fragment'

export default defineComponent<IProviderProps>({
  name: 'FormProvider',
  inheritAttrs: false,
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  setup(props: IProviderProps, { attrs, slots }) {
    const formRef = useAttach(() => toRaw(props.form), () => props.form)
    provide(FormSymbol, formRef)

    return () => h(
      Fragment,
      { attrs },
      slots
    )
  }
}) as unknown as DefineComponent<IProviderProps>
