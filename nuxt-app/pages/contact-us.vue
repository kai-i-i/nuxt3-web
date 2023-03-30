<template>
    <div class="contactform">
        <v-icon>mdi-star</v-icon>
        <span>- Mandatory information</span>
        <v-app>
            <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                <v-text-field
                    ref="name"
                    v-model="formData.name.value"
                    label="Name *"
                    :loading="busy"
                    :disabled="busy"
                    :rules="[required('name')]"
                    required
                    :error-messages="formData.name.errors"
                    @input="formData.name.errors = ''"
                    @blur="($refs.name as any).validate()"
                ></v-text-field>
                <v-text-field
                    ref="email"
                    v-model="formData.email.value"
                    label="Email *"
                    :loading="busy"
                    :disabled="busy"
                    :rules="[required('email'), isValidEmail()]" 
                    required
                    :error-messages="formData.email.errors"
                    @input="formData.email.errors = ''"
                    @blur="($refs.email as any).validate()"
                ></v-text-field>   
                <v-textarea
                    ref="enquiry"
                    v-model="formData.enquiry.value"
                    :rules="[required('enquiry details')]"
                    :error-messages="formData.enquiry.errors"
                    :loading="busy"
                    :disabled="busy"
                    rows="3"
                    label="Enquiry Details *"
                    required
                    :error="formData.enquiry.errors.length > 0"
                    @input="formData.enquiry.errors = ''"
                    @blur="validate($refs.enquiry, formData.enquiry)"
                ></v-textarea>            
                <v-btn 
                    color="primary" 
                    type="submit" 
                    :loading="busy"
                    :disabled="!valid"
                >send</v-btn>
            </v-form>
        </v-app>
    </div>
</template>

<script setup lang="ts">

    const $gtm = useGTM()

    definePageMeta({
        layout: 'new-default',
    })
    const valid = ref(false)
    const busy = ref(false)
    const form = ref(null)
    const formData = ref({
        name: { value: null, errors: '' },
        email: { value: null, errors: '' },
        enquiry: { value: null, errors: '' },
    })

    function required(propName) {
        return (v) => {
            return (
                (!!v && v.length > 0) || `You must input information for ${propName}`
            )
        }
    }

    function isValidEmail() {
        return (v) =>
            !v || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\[a-zA-Z]{2,}$/.test(v)
    }

    function sleep(msec) {
        return new Promise((resolve) => setTimeout(resolve, msec))
    }

    async function submitForm() {
        busy.value = true
        $gtm.trackEvent({ event: 'formSubmitted', formName: 'Contact Us' })    
        await sleep(5000)
        form.value.reset()
        busy.value = false
        console.log('button clicked')
    }

    async function validate(inputField, results) {
        for (const rule of inputField.rules) {
            if (results.length >= (inputField.maxErrors || 1)) {
                break
            }
        const handler = typeof rule === 'function' ? rule : () => results
        const result = await handler(inputField.modelValue)
        if (result === true) continue 
        if (typeof result !== 'string') {
            // eslint-disable-next-line no-console
            console.warn(
                `${result} is not a valid value.`
            )
            continue
        }
        if (Array.isArray(results)) results.push(result)
        else results.errors = result
        }     
    }    

</script>

<style scoped>
.contactform {
    max-width: max(50%, 400px);
    margin: 0 auto 1rem auto;
}
</style>