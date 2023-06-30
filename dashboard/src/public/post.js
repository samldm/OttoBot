const guildID = document.getElementById('guild_id').value;
const btn_save = document.getElementById('btn_save');
const select_adminRole = document.getElementById('select_adminRole');
const select_goldPassChannel = document.getElementById('select_goldPassChannel');

const input_clanRole_clanTag = document.getElementById('input_clanRole_clanTag');
const select_clanRole_role = document.getElementById('select_clanRole_role');
const select_clanRole_delete = document.getElementById('select_clanRole_delete');

const select_thRole_th = document.getElementById('select_thRole_th');
const select_thRole_role = document.getElementById('select_thRole_role');
const select_thRole_delete = document.getElementById('select_thRole_delete');

if (!guildID || !btn_save || !select_adminRole || !select_goldPassChannel || !input_clanRole_clanTag || !select_clanRole_role || !select_clanRole_delete || !select_thRole_th || !select_thRole_role || !select_thRole_delete) {
    console.error('Could not find all elements');
} else {
    btn_save.addEventListener('click', async () => {
        let options = {};



        select_adminRole.options[select_adminRole.selectedIndex].value != "none" && (options.adminRole = select_adminRole.options[select_adminRole.selectedIndex].value);
        select_goldPassChannel.options[select_goldPassChannel.selectedIndex].value != "none" && (options.goldPassChannel = select_goldPassChannel.options[select_goldPassChannel.selectedIndex].value);

        input_clanRole_clanTag.value != "" && select_clanRole_role.options[select_clanRole_role.selectedIndex].value != "none" && (options.clanRoles = { clanTag: input_clanRole_clanTag.value, role: select_clanRole_role.options[select_clanRole_role.selectedIndex].value });
        select_clanRole_delete.value != "none" && (options.deleteClanRoles = select_clanRole_delete.options[select_clanRole_delete.selectedIndex].value);

        select_thRole_th.options[select_thRole_th.selectedIndex].value != "none" && select_thRole_role.options[select_thRole_role.selectedIndex].value != "none" && (options.thRoles = { th: select_thRole_th.options[select_thRole_th.selectedIndex].value, role: select_thRole_role.options[select_thRole_role.selectedIndex].value });
        select_thRole_delete.value != "none" && (options.deleteThRoles = select_thRole_delete.options[select_thRole_delete.selectedIndex].value);

        const response = await fetch(`/dashboard/${guildID}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options)
        });
        location.reload(true);
        console.log(options);
    });
}
