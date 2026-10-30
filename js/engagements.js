document.addEventListener('DOMContentLoaded', () => {
    const engagements = [
        { place: "Singapore", lat: 1.352083, lng: 103.819836,
          text: "Internship as Quantitative Researcher at QRT. 1-year research stay at Centre for Quantum Technologies (NUS). Talk at A*STAR. Quantum Technologies Meetup organizer." },
        { place: "Shanghai, PRC", lat: 31.2304, lng: 121.4737,
          text: "Chinese Language Scholar at Shanghai Jiao Tong University." },
        { place: "Taipei, ROC", lat: 25.033964, lng: 121.564468,
          text: "1-year Exchange Student at National Taiwan University. Guest speaker at GIS Taiwan. QIP conference attendance." },
        { place: "Tainan, ROC", lat: 22.9999, lng: 120.2270,
          text: "Student cultural ambassador at Tainan Municipal Dongshan Junior High School." },
        { place: "New Delhi, India", lat: 28.6139, lng: 77.2090,
          text: "Exchange Student." },
        { place: "Ulm, Germany", lat: 48.4011, lng: 10.0027,
          text: "Double Master's degree (2x MSc) in Physics and Management from Ulm University." },
        { place: "Stuttgart, Germany", lat: 48.7758, lng: 9.1829,
          text: "Research on Quantum Machine Learning in the department of Cyber Cognitive Intelligence at Fraunhofer IPA." },
        { place: "Munich, Germany", lat: 48.1351, lng: 11.5820,
          text: "Internships at Roland Berger and KPMG." },
        { place: "Hamburg, Germany", lat: 53.5511, lng: 9.9937,
          text: "Chairman of the Board, Deutscher Gründerpreis für Schüler Alumni e.V." },
        { place: "Budapest, Hungary", lat: 47.4979, lng: 19.0402,
          text: "Summer Analyst at BlackRock." },
        { place: "Phoenix, USA", lat: 33.4484, lng: -112.0740,
          text: "Conference attendance." },
    ];

    const list = document.querySelector('.place-list');
    const mapEl = document.getElementById('map');
    const map = (window.L && mapEl) ? L.map(mapEl, { scrollWheelZoom: false }).setView([25, 40], 2) : null;

    if (map) {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);
    }

    engagements.forEach(eng => {
        let marker = null;
        if (map) {
            marker = L.circleMarker([eng.lat, eng.lng], {
                radius: 7, weight: 2,
                color: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
                fillOpacity: 0.45,
            }).addTo(map);
            const popup = document.createElement('div');
            const title = document.createElement('b');
            title.textContent = eng.place;
            popup.append(title, document.createElement('br'), eng.text);
            marker.bindPopup(popup);
        }

        if (list) {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.innerHTML = '<span class="place-name"><svg class="icon" aria-hidden="true"><use href="images/icons.svg#map-pin"/></svg></span><span class="place-text"></span>';
            btn.querySelector('.place-name').append(eng.place);
            btn.querySelector('.place-text').textContent = eng.text;
            btn.addEventListener('click', () => {
                if (!marker) return;
                map.flyTo([eng.lat, eng.lng], 5, { duration: 0.8 });
                marker.openPopup();
                mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
            li.append(btn);
            list.append(li);
        }
    });

    // Re-colour markers when the theme changes
    if (map) {
        new MutationObserver(() => {
            const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
            map.eachLayer(layer => { if (layer instanceof L.CircleMarker) layer.setStyle({ color }); });
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
});
