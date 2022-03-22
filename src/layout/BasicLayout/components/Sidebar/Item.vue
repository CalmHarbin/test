<script lang="tsx">
import { defineComponent } from 'vue'

import { Edit } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    setup(props: any) {
        return () => {
            const { icon, title } = props
            const vnodes = []
            if (icon) {
                vnodes.push(
                    <el-icon>
                        <Edit />
                    </el-icon>
                )
            }

            if (title) {
                vnodes.push(
                    <span>
                        <slot name="title">{title}</slot>
                    </span>
                )
            }
            return vnodes
        }
    }
})
</script>
