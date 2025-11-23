// ==UserScript==
// @name         Movilnet Inicio de Sesion
// @namespace    https://github.com/unibend/movilnet-inicio-de-sesion
// @version      1.3
// @description  Un userscript que arregla el inicio de sesion de movilnet.
// @author       Ben
// @match        http://aplicaciones.movilnet.com.ve/tumovilnetenlinea/*
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    console.log("Movilnet Fixer Script: Initialized.");

    // Helper to force React to register a value change
    const setNativeValue = (element, value) => {
        const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;

        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value);
        } else {
            valueSetter.call(element, value);
        }

        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true })); // Added 'change' just in case
    };

    const applyFixes = () => {
        console.log("Movilnet Fixer Script: Login form detected. Applying fixes...");

        // 1. Password Field
        const passwordField = document.querySelector('input[name="password"]');
        if (passwordField) {
            passwordField.maxLength = 8;
            passwordField.removeAttribute('disabled');
            passwordField.autocomplete = 'current-password';

            // "Touch" the password field to ensure React sees the value (if autofilled)
            if (passwordField.value) {
                setNativeValue(passwordField, passwordField.value);
                console.log("Movilnet Fixer Script: Synced password field state.");
            }
        }

        // 2. Phone Field (Touch this too, just in case)
        const phoneField = document.querySelector('input[name="numero"]');
        if (phoneField && phoneField.value) {
             setNativeValue(phoneField, phoneField.value);
        }

        // 3. Captcha
        const captchaTextElement = document.getElementById('textCaptcha');
        const captchaInputField = document.querySelector('input[name="captcha"]');

        if (captchaTextElement && captchaInputField) {
            const captchaText = captchaTextElement.textContent;
            const match = captchaText.match(/(\d+)\s*\+\s*(\d+)/);

            if (match && match.length === 3) {
                try {
                    const num1 = parseInt(match[1], 10);
                    const num2 = parseInt(match[2], 10);
                    const sum = num1 + num2;

                    setNativeValue(captchaInputField, sum);
                    console.log(`Captcha solved: ${num1} + ${num2} = ${sum}`);
                } catch (error) {
                    console.error("Movilnet Fixer Script: Error solving captcha:", error);
                }
            }
        }

        // 4. Force Button Enable (Fallback)
        // We wait 500ms to let React try to validate normally.
        // If it fails, we force it, but now that we've synced the inputs above,
        // the "crash" error shouldn't happen.
        setTimeout(() => {
            const submitButton = document.getElementById('enviar');
            if (submitButton && submitButton.hasAttribute('disabled')) {
                console.warn("Movilnet Fixer Script: Button still disabled by app. Forcing enable...");
                submitButton.removeAttribute('disabled');
            }
        }, 500);
    };

    // Observer setup
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Movilnet Fixer Script: DOM ready, setting up observer...");
        const observer = new MutationObserver((mutations, obs) => {
            const passwordField = document.querySelector('input[name="password"]');
            // We verify if the form is actually visible/ready
            if (passwordField) {
                // Small delay to ensure any React hydration is done
                setTimeout(() => {
                    applyFixes();
                }, 200);
                obs.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

    // Close duplicate tabs
    window.addEventListener('load', () => {
        if (window.opener && window.opener !== window) {
            window.close();
        }
    });

})();
