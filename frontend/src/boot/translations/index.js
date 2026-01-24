"use strict";

/**
 ** Translation Pack
 *  > Init: "boot/defaults"
 *  > Access: this.$tp
 *
 * ------------------------------------
 * Extend Package accordingly
 * ------------------------------------   
 */

import { ref } from 'vue';
import { Cookies, Dark } from 'quasar'
import dateFormat from './formats/date.js';
import datetimeFormat from './formats/datetime.js';
import datetimeFormats from './formats/index.js';
import languagePack from './lang/index.js';



// Cookie Consent: Required by system
const setCookie = (name, value) => {
    Cookies.set(name, value, {
        secure: true,
        expires: '160'
    })

    return Cookies.get(name) ?? value
}

// Client Location Cookie
const setClientLocation = (globals) => {
    Cookies.remove('client_location')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = parseFloat(position.coords.latitude.toFixed(7))
            const longitude = parseFloat(position.coords.longitude.toFixed(7))

            setCookie('client_location', { lat: latitude, lng: longitude })
            globals.$toast.success('Cookie set.')

            resolve({ lat: latitude, lng: longitude })
        },(error) => {
                globals.$toast.error('Unable to get location.')
                reject(error)
        })
    })
}

// Cookies Remove
const removeSystemCookies = (globals, clientTranslationPreferences) => {
    Cookies.remove('client_dateformat')
    Cookies.remove('client_language')
    Cookies.remove('client_location')
    Cookies.remove('client_darkmode')
    
    // Reset Prefences
    globals.$toast.success('Cookies removed.')
    clientTranslationPreferences.value.darkmode = false
    Dark.set(false)
}

export default (app) => {

    const globals = app.config.globalProperties;

    // Client provides translation options
    const clientTranslationOptions = {
        'date': ['international', 'eu', 'us'] ,
        'lang': ['de', 'en']
    };

    // User can choose translation settings
    // Cookie Consent: We store preferences as client cookies
    const clientTranslationPreferences = ref({
        location: Cookies.get('client_location') ?? null,
        dateFormat: Cookies.get('client_dateformat') ?? 'eu',        
        language: Cookies.get('client_language') ?? 'en', 
        darkmode: Cookies.get('client_darkmode') === 'true'
    });

    // Set environment
    Dark.set(clientTranslationPreferences.value.darkmode);

    // Define Translation Package
    return {

        // System preferences
        'get_cookie': (name) => Cookies.get(name),
        'set_cookie': (name, value) => setCookie(name, value),
        'set_client_location': () => setClientLocation(globals),
        'remove_cookies': () => removeSystemCookies(globals, clientTranslationPreferences),

        // Design
        'set_darkmode': (value) => {
            clientTranslationPreferences.value.darkmode = value;
            Dark.set(value);
            setCookie('client_darkmode', value)
        },

        // Options
        'client_options': clientTranslationOptions,
        'client_preferences': clientTranslationPreferences,
        
        // Formatting
        'date': (rawDate) => rawDate && dateFormat[clientTranslationPreferences.value.dateFormat]
            ? dateFormat[clientTranslationPreferences.value.dateFormat](rawDate) 
            : null,
        'datetime': (rawDate) => rawDate && datetimeFormat[clientTranslationPreferences.value.dateFormat]
            ? datetimeFormat[clientTranslationPreferences.value.dateFormat](rawDate) 
            : null,
        'formats': (attribute) => attribute && datetimeFormats[clientTranslationPreferences.value.dateFormat]
            ? datetimeFormats[clientTranslationPreferences.value.dateFormat][attribute]
            : null,
        'lang': (key) => key && languagePack[clientTranslationPreferences.value.language] && languagePack[clientTranslationPreferences.value.language][key]
            ? languagePack[clientTranslationPreferences.value.language][key]
            : null,
    }
}