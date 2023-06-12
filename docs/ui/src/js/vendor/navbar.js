let hoveredMenuPanelIndex = undefined;
let hoveredMenuItemIndex = undefined;

function updateMenuPanelVisibility() {
    for (const i of [1, 2, 3]) {
        if ([hoveredMenuItemIndex, hoveredMenuPanelIndex].includes(i)) {
            document.getElementById(`topbarMenuPanel${i}`).removeAttribute('hidden');
        } else {
            document.getElementById(`topbarMenuPanel${i}`).setAttribute('hidden', '');
        }
    }
}

for (const i of [1, 2, 3]) {
    document.getElementById(`topbarMenuItem${i}`).addEventListener('mouseenter', () => {
        hoveredMenuItemIndex = i;
        hoveredMenuPanelIndex = undefined;
        updateMenuPanelVisibility();
    });

    document.getElementById(`topbarMenuItem${i}`).addEventListener('mouseleave', () => {
        if (hoveredMenuItemIndex === i) hoveredMenuItemIndex = undefined;
        updateMenuPanelVisibility();
    });

    document.getElementById(`topbarMenuPanel${i}`).addEventListener('mouseenter', () => {
        hoveredMenuPanelIndex = i;
        hoveredMenuItemIndex = undefined;
        updateMenuPanelVisibility();
    });

    document.getElementById(`topbarMenuPanel${i}`).addEventListener('mouseleave', () => {
        if (hoveredMenuPanelIndex === i) hoveredMenuPanelIndex = undefined;
        updateMenuPanelVisibility();
    });
}
