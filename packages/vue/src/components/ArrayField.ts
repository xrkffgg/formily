import { provide, defineComponent, DefineComponent } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { VueComponent, IFieldProps } from '../types'
import ReactiveField from './ReactiveField'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'
import { observer } from '@formily/reactive-vue'

type ArrayFieldProps = IFieldProps<VueComponent, VueComponent>

export default observer(defineComponent<ArrayFieldProps>({
  name: 'ArrayField',
  /* eslint-disable vue/require-prop-types  */
  /* eslint-disable vue/require-default-prop */
  props: {
    name: {},
    title: {},
    description: {},
    value: {},
    initialValue: {},
    basePath: {},
    decorator: Array,
    component: Array,
    display: String,
    pattern: String,
    required: {
      type: Boolean,
      default: undefined
    },
    validateFirst: {
      type: Boolean,
      default: undefined
    },
    hidden: {
      type: Boolean,
      default: undefined
    },
    visible: {
      type: Boolean,
      default: undefined
    },
    editable: {
      type: Boolean,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    readOnly: {
      type: Boolean,
      default: undefined
    },
    readPretty: {
      type: Boolean,
      default: undefined
    },
    dataSource: {},
    validator: {},
    reactions: [Array, Function],
  },
  setup(props: ArrayFieldProps, { slots }) {
    const formRef = useForm()
    const parentRef = useField()
    const basePath = props.basePath !== undefined ? props.basePath : parentRef?.value?.address
    const fieldRef = useAttach(() => formRef.value.createArrayField({
      ...props,
      basePath,
      ...getRawComponent(props)
    }), [() => props.name, formRef])

    provide(FieldSymbol, fieldRef)

    return () => h(
      ReactiveField, 
      {
        props: {
          field: fieldRef.value
        }
      },
      {
        ...slots,
        default: () => slots.default && slots.default({
          field: fieldRef.value,
          form: fieldRef.value.form
        })
      }
    )
  }
}) as unknown as DefineComponent<ArrayFieldProps>)
