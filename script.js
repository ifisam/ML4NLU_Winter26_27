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
    reading: "Reading",
    exercise: "Exercise",
    reference: "Reference",
    transcript: "Transcript"
};

function renderSchedule(schedule) {
    const tbody = document.getElementById('schedule-body');

    schedule.forEach(weekData => {
        const tr = document.createElement('tr');

        // Week
        const tdWeek = document.createElement('td');
        tdWeek.innerHTML = `<strong>Week ${weekData.week}</strong>`;

        // Topic
        const tdTopic = document.createElement('td');
        tdTopic.innerHTML = `<strong>${weekData.topic}</strong>`;

        // Suggested Readings & Materials
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
                    const href = item.url || item.file;
                    li.innerHTML = `<a href="${href}" target="_blank"><span class="material-chip material-chip--${item.type}">${label}</span> ${item.title}</a>`;
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

        tr.appendChild(tdWeek);
        tr.appendChild(tdTopic);
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
