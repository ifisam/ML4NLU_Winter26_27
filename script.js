document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderSchedule(data.schedule);
            renderResources(data.resources);
        })
        .catch(error => console.error("Error loading course data:", error));
});

const MATERIAL_LABELS = {
    slides: "Slides",
    flipped: "Flipped",
    exercise: "Exercise",
    reference: "Reference",
    transcript: "Transcript"
};

function renderSchedule(schedule) {
    const tbody = document.getElementById('schedule-body');

    schedule.forEach(weekData => {
        const tr = document.createElement('tr');

        // Week / Date
        const tdDate = document.createElement('td');
        tdDate.innerHTML = `<strong>Week ${weekData.week}</strong><br>${weekData.date}`;

        // Topic
        const tdTopic = document.createElement('td');
        tdTopic.innerHTML = `<strong>${weekData.topic}</strong>`;

        // Lecture
        const tdLecture = document.createElement('td');
        tdLecture.textContent = weekData.lecture;

        // Tutorial / Seminar
        const tdTutSem = document.createElement('td');
        let tutSemHtml = '';
        if (weekData.tutorial) tutSemHtml += `<em>Tut:</em> ${weekData.tutorial}<br>`;
        if (weekData.seminar) tutSemHtml += `<em>Sem:</em> ${weekData.seminar}`;
        tdTutSem.innerHTML = tutSemHtml;

        // Materials & Content
        const tdContent = document.createElement('td');
        if (weekData.visible) {
            const hasMaterials = weekData.materials && weekData.materials.length > 0;
            const hasContent = weekData.content && weekData.content.length > 0;

            if (hasMaterials) {
                const chipList = document.createElement('ul');
                chipList.className = 'material-list';
                weekData.materials.forEach(item => {
                    const li = document.createElement('li');
                    const label = MATERIAL_LABELS[item.type] || item.type;
                    li.innerHTML = `<a href="${item.file}" target="_blank"><span class="material-chip material-chip--${item.type}">${label}</span> ${item.title}</a>`;
                    chipList.appendChild(li);
                });
                tdContent.appendChild(chipList);
            }

            if (hasContent) {
                const ul = document.createElement('ul');
                ul.className = 'content-list';
                weekData.content.forEach(item => {
                    const li = document.createElement('li');
                    if (item.type === 'video') {
                        li.innerHTML = `[Video] <a href="${item.url}" target="_blank">${item.title}</a>`;
                    } else if (item.type === 'questions') {
                        li.innerHTML = `<strong>${item.title}:</strong><ul>` + item.items.map(q => `<li>${q}</li>`).join('') + `</ul>`;
                    }
                    ul.appendChild(li);
                });
                tdContent.appendChild(ul);
            }

            if (!hasMaterials && !hasContent) {
                tdContent.innerHTML = `<span class="hidden-content">No materials posted yet.</span>`;
            }
        } else if (weekData.topic === '-') {
            tdContent.innerHTML = `<span class="hidden-content">No session this week.</span>`;
        } else {
            tdContent.innerHTML = `<span class="hidden-content">Content will be available closer to the date.</span>`;
        }

        tr.appendChild(tdDate);
        tr.appendChild(tdTopic);
        tr.appendChild(tdLecture);
        tr.appendChild(tdTutSem);
        tr.appendChild(tdContent);

        tbody.appendChild(tr);
    });
}

function renderResources(resources) {
    const ul = document.getElementById('resources-list');

    resources.forEach(res => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${res.url}" target="_blank"><strong>${res.title}</strong></a> - ${res.authors}`;
        ul.appendChild(li);
    });
}
