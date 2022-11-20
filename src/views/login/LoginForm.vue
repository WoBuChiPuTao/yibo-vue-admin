<template>
    <form :model="loginForm" class="login-content">
        <h2>sign in</h2>
        <div :class="userBox">
            <div class="i">
                <ElIcon class="icon">
                    <User />
                </ElIcon>
            </div>
            <div class="div">
                <h5>用户</h5>
                <input type="text" ref="userRef" v-model="loginForm.username" class="input">
            </div>
        </div>
        <div :class="passBox">
            <div class="i">
                <ElIcon class="icon">
                    <Lock />
                </ElIcon>
            </div>
            <div class="div">
                <h5>密码</h5>
                <input type="password" ref="passRef" v-model="loginForm.password" class="input">
            </div>
        </div>
        <a>没有账户？去注册</a>
        <button type="submit" class="sub">登录</button>
    </form>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
const userBox = ref('input-box')
const passBox = ref('input-box')
const userRef = ref<HTMLInputElement | null>()
const passRef = ref<HTMLInputElement | null>()

onMounted(() => {
    userRef?.value?.addEventListener('focus', () => { userBox.value = 'input-box focus'; console.log(userBox) })
    userRef?.value?.addEventListener('blur', () => {
        if (userRef?.value?.value === '') {
            userBox.value = 'input-box'
        }
    })
    passRef?.value?.addEventListener('focus', () => { passBox.value = 'input-box focus' })
    passRef?.value?.addEventListener('blur', () => {
        if (passRef?.value?.value === '') {
            passBox.value = 'input-box'
        }
    })
})

const loginForm = reactive<{ username: string, password: string }>({
    username: '',
    password: ''
})

</script>

<style lang="less" scoped>
.login-content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    h2 {
        width: 15px 0;
        text-transform: uppercase;
        font-size: 2rem;
    }

    .input-box {
        width: 80%;
        position: relative;
        display: grid;
        grid-template-columns: 5% 95%;
        margin: 25px 0;
        padding: 5px 0;
        border-bottom: 2px solid #d9d9d9;

        &::before,
        &::after {
            content: "";
            position: absolute;
            bottom: -2px;
            width: 0%;
            height: 2px;
            background-color: #111f1a;
            transition: .4s;
        }

        &::before {
            right: 50%;
        }

        &::after {
            left: 50%;
        }

        .i {
            display: flex;
            justify-content: center;
            align-items: center;

            .icon {
                transition: .3s;
            }
        }

        .div {
            position: relative;
            height: 45px;

            h5 {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                transition: .4s;
                font-size: 18px;
                color: #999;
            }

            .input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: none;
                border: none;
                outline: none;
                padding: 0.5rem 0.7rem;
                color: #555;
                font-family: 'position', sans-serif;
            }
        }
    }

    .input-box.focus {

        &::before,
        &::after {
            width: 50%;
        }

        .div {
            h5 {
                top: -5px;
                font-size: 15px;
            }
        }

        .i {
            .icon {
                color: #0616fa;
            }
        }
    }

    a {
        display: block;
        text-align: right;
        text-decoration: none;
        color: #999;
        font-size: 0.5rem;
        transition: .3s;
        transform: translateX(80%);
        cursor: pointer;
    }

    .sub {
        display: block;
        width: 70%;
        height: 50px;
        border-radius: 25px;
        outline: none;
        border: none;
        background-image: linear-gradient(to right, #3d2fff, #2cd5ff, #0f0099);
        background-size: 200%;
        font-size: 1.2rem;
        color: rgb(255, 255, 255);
        cursor: pointer;
        margin: 1.2rem 0;
        transition: .3s;

        &:hover {
            background-position: right;
        }
    }

}
</style>
