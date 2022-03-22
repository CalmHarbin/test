import { ElNotification, Notify } from 'element-plus'

const CustomNotification: Notify = (options) => ElNotification.info(options)

CustomNotification.success = (options) => ElNotification.success(options)
CustomNotification.warning = (options) => ElNotification.warning(options)
CustomNotification.info = (options) => ElNotification.info(options)
CustomNotification.error = (options) => ElNotification.error(options)
CustomNotification.closeAll = () => ElNotification.closeAll()

export default CustomNotification
