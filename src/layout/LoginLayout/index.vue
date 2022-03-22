<template>
    <div style="height: 100%">
        <div class="container-left">
            <div ref="glEmoParent" :style="{ height: boxwid + 'px' }">
                <div ref="glEmo"></div>
            </div>
        </div>
        <div class="container-right">
            <div class="wrapper-login">
                <img src="/img/login-logo.gif" class="logo" />
                <div class="login-bg">
                    <el-form
                        ref="loginForm"
                        :model="from"
                        :show-message="false"
                        :inline-message="true"
                        class="login-form"
                        auto-complete="on"
                        label-position="left"
                    >
                        <div class="login-box">
                            <h3>桦拓冷链二期本草云平台</h3>
                            <el-form-item
                                style="margin-bottom: 10px"
                                prop="name"
                                :rules="{
                                    required: true,
                                    message: '请输入用户名',
                                    trigger: 'blur'
                                }"
                            >
                                <li class="user-name-box">
                                    <div id="user-name-box-image" class="fl" />
                                    <el-input
                                        v-model.trim="from.name"
                                        placeholder="手机号/用户名"
                                        class="input"
                                        name="username"
                                        type="text"
                                        auto-complete="on"
                                    />
                                </li>
                            </el-form-item>
                            <el-form-item
                                style="margin-bottom: 10px"
                                prop="password"
                                :rules="{
                                    required: true,
                                    message: '请输入密码',
                                    trigger: 'blur'
                                }"
                            >
                                <li class="password-box">
                                    <div id="password-box-image" class="fl" />
                                    <el-input
                                        v-model.trim="from.password"
                                        :type="passwordType"
                                        placeholder="密码"
                                        class="input"
                                        name="password"
                                        auto-complete="on"
                                    />
                                    <span class="show-pwd" @click="showPwd">
                                        <!-- <svg-icon
                                            v-show="passwordType === 'password'"
                                            icon-class="eye"
                                        />
                                        <i
                                            v-show="passwordType === ''"
                                            class="el-icon-view"
                                        /> -->
                                    </span>
                                    <p style="color: red">{{ errormsg }}</p>
                                </li>
                            </el-form-item>
                            <el-form-item
                                :rules="{
                                    required: true,
                                    message: '请输入验证码',
                                    trigger: 'blur'
                                }"
                                prop="code"
                            >
                                <li class="password-box">
                                    <div id="code-box-image" class="fl" />
                                    <el-input
                                        v-model.trim="from.code"
                                        type="text"
                                        placeholder="请输入验证码"
                                        class="input"
                                        name="code"
                                    />
                                    <span class="show-pwd" @click="returnCode">
                                        <img
                                            :src="
                                                codeData &&
                                                codeData !== null &&
                                                codeData.codePic
                                            "
                                            alt=""
                                        />
                                    </span>
                                </li>
                            </el-form-item>
                            <el-button
                                id="focusbtn"
                                :loading="loading"
                                class="login"
                                type="primary"
                                @click.prevent="handleLogin"
                            >
                                {{
                                    loginerros > 0
                                        ? loginerros + 's后重试'
                                        : '登录'
                                }}
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="footer" @click="to">
                Copyright(C)
                {{ new Date().getFullYear() }}xxxxxxxx有限公司
                <br />
                版权所有 沪ICP备---------号
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { ElNotification } from 'element-plus'
import { defineComponent } from 'vue'

import ThreeGlobe from 'three-globe'
import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    Color,
    Fog,
    PointLight
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import countries from '@/assets/gldata/globe-data-min.json'
import travelHistory from '@/assets/gldata/my-flights.json'
import airportHistory from '@/assets/gldata/my-airports.json'

import { requestUtils } from '@/utils'

let scene: any = undefined
let renderer: any = undefined
let camera: any = undefined
let controls: any = undefined
let Globe: any = undefined

type LoginStateType = {
    from: {
        name: string
        password: string
        code: string
    }
    loginForm: {
        name: string
        password: string
        clip: string
        code: string
        codeId: string
    }
    errormsg: string
    passwordType: string
    loading: boolean
    showDialog: boolean
    redirect: any
    loginerros: number
    boxwid: number
    imglist: any[]
    onoff: boolean
    codeData: any
    mouseX: number
    mouseY: number
    windowHalfX: number
    windowHalfY: number
}

export default defineComponent({
    name: 'LoginMain',
    data() {
        return {
            from: {
                name: '1000',
                password: '000000',
                code: ''
            },
            loginForm: {
                name: '1000',
                password: '000000',
                clip: '',
                code: '',
                codeId: ''
            },
            errormsg: '',
            passwordType: 'password',
            loading: false,
            showDialog: false,
            redirect: undefined,
            loginerros: 0,

            boxwid: 200,
            imglist: [],

            onoff: false,
            codeData: {},

            mouseX: 0,
            mouseY: 0,
            windowHalfX: 0,
            windowHalfY: 0
        } as LoginStateType
    },
    watch: {
        '@route'(route) {
            this.redirect = route.query && route.query.redirect
        }
    },
    created() {
        document.addEventListener('keyup', this.enterKey)

        // 过期提示
        if (this.$route.query.expire) {
            // 清除登录信息
            this.$store.dispatch('FedLogOut')
            ;(this as any).$message.error({
                message: '登录已过期,请重新登录',
                onClose: () => {
                    location.href = '#/login'
                }
            })
        }
        this.returnCode()
    },
    mounted() {
        const that = this
        window.onresize = function temp() {
            const hei = `${document.documentElement.clientHeight}`
            that.boxwid = parseFloat(hei)
        }
        const hei = `${document.documentElement.clientHeight}`
        this.boxwid = parseFloat(hei)

        this.init()
        this.initGlobe()
        this.onWindowResize()
        this.animate()
    },
    unmounted() {
        // 销毁enter事件
        document.removeEventListener('keyup', this.enterKey)

        window.addEventListener('resize', this.onWindowResize, false)
        document.addEventListener('mousemove', this.onMouseMove)
    },
    methods: {
        enterKey() {
            if (
                document.getElementById('focusbtn') !==
                    document.activeElement &&
                (window as any).event.keyCode === 13
            )
                this.handleLogin()
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
        },
        handleLogin() {
            if (this.loginerros > 0) return
            ;(this.$refs.loginForm as any).validate(
                (valid: boolean, vaildMessage: any) => {
                    if (valid && !this.onoff) {
                        this.loading = true
                        this.loginForm.name = this.from.name
                        this.loginForm.password = this.from.password
                        this.loginForm.code = this.from.code
                        this.loginForm.codeId = (this.codeData as any).codeId

                        const param = {
                            tenantid: '1080',
                            loginName: this.loginForm.name,
                            captcha: this.loginForm.code,
                            password: this.loginForm.password,
                            modelKey: (this.codeData as any).codeId
                        }
                        this.onoff = true
                        this.$store
                            .dispatch('account/AccountLogin', {
                                ssoadminLogindto: param
                            })
                            .then(() => {
                                this.errormsg = ''
                                this.$router.push('/')
                            })
                            .catch((res: any) => {
                                // 刷新验证码
                                this.returnCode()

                                if (res.code === 301) {
                                    this.errormsg = '系统处理异常，请联系管理员'
                                    return
                                } else if (res.code !== 0) {
                                    this.errormsg = res.msg
                                    return
                                }
                            })
                            .finally(() => {
                                this.loading = false
                                setTimeout(() => {
                                    this.onoff = false
                                }, 200)
                            })
                    } else {
                        const vaildValues: any[] =
                            Object.values(vaildMessage) || []

                        if (vaildValues.length > 0) {
                            const vaildMessages = vaildValues.filter(
                                (n: any[]) => n.length > 0 && n[0].message
                            )

                            if (vaildMessages.length > 0) {
                                ElNotification.warning({
                                    title: '数据验证失败！',
                                    message: vaildMessages[0][0].message
                                })
                            } else {
                                ElNotification.warning({
                                    title: '数据失败！',
                                    message: '未知错误'
                                })
                            }
                        }
                    }
                }
            )
        },
        // 获取验证码
        returnCode() {
            requestUtils('joy.sso.log.loginService.getcode').then((res) => {
                this.codeData = res.result
            })
        },
        to() {
            window.open('https://beian.miit.gov.cn')
        },
        init() {
            const glRef: any = this.$refs['glEmo']

            renderer = new WebGLRenderer({ antialias: true })
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(window.innerWidth - 500, window.innerHeight)
            glRef.appendChild(renderer.domElement)

            scene = new Scene()
            scene.add(new AmbientLight(0xbbbbbb, 0.3))
            scene.background = new Color(0x040d21)

            camera = new PerspectiveCamera()
            camera.aspect = (window.innerWidth - 500) / window.innerHeight
            camera.updateProjectionMatrix()

            let dLight = new DirectionalLight(0xffffff, 0.8)
            dLight.position.set(-800, 2000, 400)
            camera.add(dLight)

            let dLight1 = new DirectionalLight(0x7982f6, 1)
            dLight1.position.set(-200, 500, 200)
            camera.add(dLight1)

            let dLight2 = new PointLight(0x8566cc, 0.5)
            dLight2.position.set(-200, 500, 200)
            camera.add(dLight2)

            camera.position.z = 400
            camera.position.x = 0
            camera.position.y = 0

            scene.add(camera)

            scene.fog = new Fog(0x535ef3, 400, 2000)
            controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true
            controls.dynamicDampingFactor = 0.01
            controls.enablePan = false
            controls.minDistance = 200
            controls.maxDistance = 500
            controls.rotateSpeed = 0.8
            controls.zoomSpeed = 1
            controls.autoRotate = false

            controls.minPolarAngle = Math.PI / 3.5
            controls.maxPolarAngle = Math.PI - Math.PI / 3

            window.addEventListener('resize', this.onWindowResize, false)
            document.addEventListener('mousemove', this.onMouseMove)
        },
        initGlobe() {
            Globe = new ThreeGlobe({
                waitForGlobeReady: true,
                animateIn: true
            })
                .hexPolygonsData(countries.features)
                .hexPolygonResolution(3)
                .hexPolygonMargin(0.7)
                .showAtmosphere(true)
                .atmosphereColor('#3a228a')
                .atmosphereAltitude(0.25)
                .hexPolygonColor((e: any) => {
                    if (
                        [
                            'KGZ',
                            'KOR',
                            'THA',
                            'RUS',
                            'UZB',
                            'IDN',
                            'KAZ',
                            'MYS'
                        ].includes(e.properties.ISO_A3)
                    ) {
                        return 'rgba(255,255,255, 1)'
                    } else return 'rgba(255,255,255, 0.7)'
                })

            setTimeout(() => {
                Globe.arcsData(travelHistory.flights)
                    .arcColor((e: any) => {
                        return e.status ? '#9cff00' : '#FF4000'
                    })
                    .arcAltitude((e: any) => {
                        return e.arcAlt
                    })
                    .arcStroke((e: any) => {
                        return e.status ? 0.5 : 0.3
                    })
                    .arcDashLength(0.9)
                    .arcDashGap(4)
                    .arcDashAnimateTime(1000)
                    .arcsTransitionDuration(1000)
                    .arcDashInitialGap((e: any) => e.order * 1)
                    .labelsData(airportHistory.airports)
                    .labelColor(() => '#ffcb21')
                    .labelDotOrientation((e: any) => {
                        return e.text === 'ALA' ? 'top' : 'right'
                    })
                    .labelDotRadius(0.3)
                    .labelSize((e: any) => e.size)
                    .labelText('city')
                    .labelResolution(6)
                    .labelAltitude(0.01)
                    .pointsData(airportHistory.airports)
                    .pointColor(() => '#ffffff')
                    .pointsMerge(true)
                    .pointAltitude(0.07)
                    .pointRadius(0.05)
            }, 1000)

            Globe.rotateY(-Math.PI * (5 / 9))
            Globe.rotateZ(-Math.PI / 6)
            const globeMaterial = Globe.globeMaterial()
            globeMaterial.color = new Color(0x3a228a)
            globeMaterial.emissive = new Color(0x220038)
            globeMaterial.emissiveIntensity = 0.1
            globeMaterial.shininess = 0.7

            scene.add(Globe)
        },
        animate() {
            camera.position.x +=
                Math.abs(this.mouseX) <= this.windowHalfX / 2
                    ? (this.mouseX / 2 - camera.position.x) * 0.005
                    : 0
            camera.position.y += (-this.mouseY / 2 - camera.position.y) * 0.005
            camera.lookAt(scene.position)
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(this.animate)
        },
        onMouseMove(event: any) {
            this.mouseX = event.clientX - this.windowHalfX
            this.mouseY = event.clientY - this.windowHalfY
        },

        onWindowResize() {
            camera.aspect = (window.innerWidth - 550) / window.innerHeight
            camera.updateProjectionMatrix()
            this.windowHalfX = (window.innerWidth - 550) / 1.5
            this.windowHalfY = window.innerHeight / 1.5
            renderer.setSize(window.innerWidth - 550, window.innerHeight)
        }
    }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$width: 550px;

.container-left {
    float: left;
    width: calc(100% - #{$width});
    height: 100%;
    overflow: hidden;
    background-color: #ccc;
}

.container-right {
    float: left;
    width: $width;
    height: 100%;
}

.wrapper-login {
    margin: 0 auto;
    padding-top: 15%;
    padding-bottom: 0;

    // border: 1px solid #c4c4c4;
    // border-radius: 20px;
    // background: #fff;
    overflow: hidden;
    opacity: 0.96;

    // -webkit-box-shadow: 0 0 15px rgba(134, 106, 214, 0.5);
    // -moz-box-shadow: 0 0 15px rgba(134, 106, 214, 0.5);
    // box-shadow: 0 0 15px rgba(134, 106, 214, 0.5);
    .logo {
        display: block;
        width: 300px;
        height: auto;
        margin: 0 auto;
    }
}
@media screen and (max-width: 1366px) {
    .wrapper-login {
        width: auto;
        padding-top: 40px;
    }
}

.wrapper-login::after {
    clear: both;
    content: ' ';
}

.login-bg {
    width: $width;

    // float: right;
    padding-top: 20px;
    background: #fff;
}

.login-box {
    width: 100%;
    text-align: center;
    background: #fff;
    border-radius: 16px;
}

.login-box h3 {
    padding: 10px 0;
    color: #1657e8;
    font-weight: bold;
    font-size: 17px;
    letter-spacing: 3px;
    text-align: center;

    // margin-left: 0px;
}

.login-box h3 span {
    color: #adcdff;
    font-weight: 400;
    font-size: 16px;
    text-align: left;
}

.login-box input {
    float: left;
    width: 270px;
    height: 38px;
    color: #999;
    font-size: 14px;
    line-height: 38px;
    border: none;
}

.login-box .user-name-box {
    display: flex;
    align-items: center;
    width: 340px;
    height: 40px;
    margin: 20px auto 0;
    color: #999;

    // border-radius: 20px;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px #ccc solid;
}

.login-box input:-webkit-autofill {
    box-shadow: 0 0 0 1000px white inset !important;
}

.login-box .user-name-box #user-name-box-image {
    display: block;
    height: 40px;
    margin: 2px;
    margin-top: 0;
    padding-left: 40px;
    background: url('@/assets/imgs/icon01.png') no-repeat;
    background-position: 6px;
}

.login-box .user-name-box:hover {
    color: #ffcd69;
    border-bottom: 1px solid#1657e8;
}

.login-box .user-name-box:hover #user-name-box-image {
    background: url('@/assets/imgs/icon01_hover.png') no-repeat;
    background-position: 6px;
}

.login-box .password-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 340px;
    height: 40px;
    margin: 20px auto 0;
    color: #999;

    // border-radius: 20px;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px #ccc solid;
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-input__inner) {
    border: none;
}

:deep(.el-input) {
    flex: 1;
}

.login-box .password-box #password-box-image {
    display: block;
    height: 40px;
    margin: 2px;
    margin-top: 0;
    padding-left: 40px;
    background: url('@/assets/imgs/icon02.png') no-repeat;
    background-position: 6px;
}

#code-box-image {
    display: block;
    height: 40px;
    margin: 2px;
    margin-top: 0;
    padding-left: 40px;
    background: url('@/assets/imgs/icon03.png') no-repeat;
    background-position: 6px;
}

.login-box .password-box:hover {
    color: #ffcd69;
    border-bottom: 1px solid#1657e8;
}

.login-box .password-box:hover #password-box-image {
    background: url('@/assets/imgs/icon02_hover.png') no-repeat;
    background-position: 6px;
}

.login-box .password-box:hover #code-box-image {
    background: url('@/assets/imgs/icon03_hover.png') no-repeat;
    background-position: 6px;
}

.login-box input:focus {
    outline: none;
}

.login-box .remember {
    width: 340px;
    margin: 30px auto 0;
    text-align: left;
}

.login-box .remember span {
    color: #333;
}

.login-box .fr a {
    color: #ffc44c;
    font-weight: 800;
}

.login-box .login {
    width: 340px;
    height: 40px;
    margin: 30px auto 0;
    color: white;
    text-align: center;

    // background: url('@/assets/imgs/bj_jianbian.jpg') repeat-y;
    background-size: 100%;
    border-radius: 20px;
    cursor: pointer;
}

.show-pwd {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
}

.wrapper-login button {
    background: #1657e8 !important;
}

.footer {
    width: 100%;
    margin: 16px auto 30px;
    color: #c4c4c4;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
}
</style>
