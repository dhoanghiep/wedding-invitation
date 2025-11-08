// Countdown Timer Functionality
(function() {
    'use strict';
    
    const weddingDate = new Date('2026-01-01T17:00:00').getTime();
    
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    const monthsItem = document.getElementById('countdown-months');
    const daysItem = document.getElementById('countdown-days');
    const hoursItem = document.getElementById('countdown-hours');
    const minutesItem = document.getElementById('countdown-minutes');
    const secondsItem = document.getElementById('countdown-seconds');
    
    const monthsLabel = monthsItem ? monthsItem.querySelector('.countdown-label') : null;
    const daysLabel = daysItem ? daysItem.querySelector('.countdown-label') : null;
    const hoursLabel = hoursItem ? hoursItem.querySelector('.countdown-label') : null;
    const minutesLabel = minutesItem ? minutesItem.querySelector('.countdown-label') : null;
    const secondsLabel = secondsItem ? secondsItem.querySelector('.countdown-label') : null;
    
    // Store previous values to avoid unnecessary label updates
    let previousValues = {
        months: null,
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    };
    let forceLabelUpdate = false;
    let isUpdatingLabels = false;
    
    function updateCountdown() {
        const now = new Date();
        const wedding = new Date(weddingDate);
        
        if (wedding < now) {
            // Wedding day has arrived or passed
            monthsElement.textContent = '00';
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            // Hide all items
            [monthsItem, daysItem, hoursItem, minutesItem, secondsItem].forEach(item => {
                if (item) item.style.display = 'none';
            });
            return;
        }
        
        // Calculate months by incrementally adding months until we would exceed the wedding date
        let months = 0;
        const tempDate = new Date(now);
        
        // Add months one by one until adding one more would exceed the wedding date
        while (true) {
            const nextMonth = new Date(tempDate);
            nextMonth.setMonth(tempDate.getMonth() + 1);
            
            if (nextMonth > wedding) {
                break;
            }
            
            months++;
            tempDate.setMonth(tempDate.getMonth() + 1);
        }
        
        // Calculate remaining days after months
        const tempDateTimestamp = tempDate.getTime();
        const daysDiff = Math.floor((wedding - tempDateTimestamp) / (1000 * 60 * 60 * 24));
        
        // Calculate hours, minutes, and seconds from the remaining time
        const remainingTime = wedding - tempDateTimestamp - (daysDiff * 1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        // Create array of values with their corresponding elements, items, and labels
        const countdownValues = [
            { value: months, element: monthsElement, item: monthsItem, label: monthsLabel, singularKey: 'countdown.month', pluralKey: 'countdown.months' },
            { value: daysDiff, element: daysElement, item: daysItem, label: daysLabel, singularKey: 'countdown.day', pluralKey: 'countdown.days' },
            { value: hours, element: hoursElement, item: hoursItem, label: hoursLabel, singularKey: 'countdown.hour', pluralKey: 'countdown.hours' },
            { value: minutes, element: minutesElement, item: minutesItem, label: minutesLabel, singularKey: 'countdown.minute', pluralKey: 'countdown.minutes' },
            { value: seconds, element: secondsElement, item: secondsItem, label: secondsLabel, singularKey: 'countdown.second', pluralKey: 'countdown.seconds' }
        ];
        
        // Find first 3 non-zero values
        const nonZeroValues = countdownValues.filter(item => item.value > 0);
        const displayItems = nonZeroValues.slice(0, 3);
        
        // Update all values and labels
        countdownValues.forEach(({ value, element, label, singularKey, pluralKey }, index) => {
            const key = ['months', 'days', 'hours', 'minutes', 'seconds'][index];
            
            if (element) {
                element.textContent = String(value).padStart(2, '0');
            }
            
            // Update label based on current value (singular/plural)
            if (label && window.Language) {
                // Use singular form if value is 1, plural otherwise
                const translationKey = value === 1 ? singularKey : pluralKey;
                const translation = window.Language.t(translationKey);
                
                // Only update if the text is actually different to avoid unnecessary DOM updates
                if (label.textContent !== translation) {
                    label.textContent = translation;
                }
                
                // Update previous value to track changes
                previousValues[key] = value;
            }
        });
        
        // Show/hide items based on whether they should be displayed
        countdownValues.forEach(({ item, value }) => {
            if (item) {
                const shouldDisplay = displayItems.some(displayItem => displayItem.item === item);
                item.style.display = shouldDisplay ? '' : 'none';
            }
        });
        
        // Reset force update flag after processing
        forceLabelUpdate = false;
    }
    
    // Function to initialize countdown labels immediately
    function initializeCountdownLabels() {
        if (!window.Language) return;
        
        // Calculate current values
        const now = new Date();
        const wedding = new Date(weddingDate);
        
        if (wedding < now) return;
        
        // Calculate months
        let months = 0;
        const tempDate = new Date(now);
        while (true) {
            const nextMonth = new Date(tempDate);
            nextMonth.setMonth(tempDate.getMonth() + 1);
            if (nextMonth > wedding) break;
            months++;
            tempDate.setMonth(tempDate.getMonth() + 1);
        }
        
        // Calculate remaining time
        const tempDateTimestamp = tempDate.getTime();
        const daysDiff = Math.floor((wedding - tempDateTimestamp) / (1000 * 60 * 60 * 24));
        const remainingTime = wedding - tempDateTimestamp - (daysDiff * 1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        // Set labels immediately with correct singular/plural form
        const labels = [
            { label: monthsLabel, value: months, singularKey: 'countdown.month', pluralKey: 'countdown.months' },
            { label: daysLabel, value: daysDiff, singularKey: 'countdown.day', pluralKey: 'countdown.days' },
            { label: hoursLabel, value: hours, singularKey: 'countdown.hour', pluralKey: 'countdown.hours' },
            { label: minutesLabel, value: minutes, singularKey: 'countdown.minute', pluralKey: 'countdown.minutes' },
            { label: secondsLabel, value: seconds, singularKey: 'countdown.second', pluralKey: 'countdown.seconds' }
        ];
        
        isUpdatingLabels = true;
        labels.forEach(({ label, value, singularKey, pluralKey }) => {
            if (label) {
                const translationKey = value === 1 ? singularKey : pluralKey;
                const translation = window.Language.t(translationKey);
                // Only update if different to avoid unnecessary changes
                if (label.textContent !== translation) {
                    label.textContent = translation;
                }
            }
        });
        // Use setTimeout to reset flag after DOM updates complete
        setTimeout(() => { isUpdatingLabels = false; }, 0);
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Update countdown labels when language changes
    document.addEventListener('languageChanged', () => {
        forceLabelUpdate = true;
        updateCountdown();
    });
    
    // Initialize labels immediately when Language module is ready
    if (window.Language) {
        // Language is already loaded, initialize labels immediately
        initializeCountdownLabels();
    } else {
        // Wait for Language module to be available
        const checkLanguage = setInterval(() => {
            if (window.Language) {
                clearInterval(checkLanguage);
                initializeCountdownLabels();
            }
        }, 50); // Check more frequently
        // Stop checking after 5 seconds
        setTimeout(() => clearInterval(checkLanguage), 5000);
    }
    
    // Also listen for when language system initializes
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (window.Language) {
                initializeCountdownLabels();
            }
        }, 0);
    });
    
    // Use MutationObserver to immediately correct labels if language system sets them
    if (monthsLabel || daysLabel || hoursLabel || minutesLabel || secondsLabel) {
        const observer = new MutationObserver((mutations) => {
            // Don't react to our own updates
            if (isUpdatingLabels) return;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    // A label was changed by something else (likely language system), immediately set the correct form
                    if (window.Language) {
                        // Use requestAnimationFrame to ensure this runs after the language system update
                        requestAnimationFrame(() => {
                            initializeCountdownLabels();
                        });
                    }
                }
            });
        });
        
        // Observe all countdown labels
        [monthsLabel, daysLabel, hoursLabel, minutesLabel, secondsLabel].forEach(label => {
            if (label) {
                observer.observe(label, { 
                    childList: true, 
                    characterData: true, 
                    subtree: true 
                });
            }
        });
    }
})();

