import type { Building } from 'typings/Building';
import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <
    Scope<Empty, ['alliance', 'credits', 'profile', 'tasks'], ['protocol']>
>{
    validatorFunction: () => true,
    alliance: <
        Scope<
            Empty,
            [],
            [
                'open',
                'members',
                'onlineMembers',
                'buildings',
                'funds',
                'forum',
                'schoolings',
                'messages',
                'applications',
                'logfiles'
            ]
        >
    >{
        validatorFunction: () => true,
        open() {
            window.lightboxOpen('/verband');
        },
        buildings() {
            window.lightboxOpen('/verband/gebauede');
        },
        forum() {
            window.lightboxOpen('/alliance_threads');
        },
        funds() {
            window.lightboxOpen('/verband/kasse');
        },
        members() {
            window.lightboxOpen('/verband/mitglieder');
        },
        onlineMembers() {
            window.lightboxOpen('/verband/mitglieder?online=true');
        },
        messages() {
            window.lightboxOpen('/alliance_messages');
        },
        schoolings() {
            window.lightboxOpen('/schoolings');
        },
        applications() {
            window.lightboxOpen('/verband/bewerbungen');
        },
        logfiles() {
            window.lightboxOpen('/alliance_logfiles');
        },
    },
    credits: <Scope<Empty, [], ['open', 'daily', 'overview']>>{
        validatorFunction: () => true,
        daily() {
            window.lightboxOpen('/credits/daily');
        },
        open() {
            window.lightboxOpen('/credits');
        },
        overview() {
            window.lightboxOpen('/credits/overview');
        },
    },
    profile: <Scope<Empty, [], ['open', 'level', 'awards', 'notes']>>{
        validatorFunction: () => true,
        open() {
            window.lightboxOpen(`/profile/${window.user_id}`);
        },
        level() {
            window.lightboxOpen('/level');
        },
        awards() {
            window.lightboxOpen('/auszeichnungen');
        },
        notes() {
            window.lightboxOpen('/note');
        },
    },
    tasks: <Scope<Empty, [], ['open']>>{
        validatorFunction: () => true,
        open() {
            window.lightboxOpen('/tasks/index');
        },
    },
    async protocol() {
        await (window[PREFIX] as Vue).$store.dispatch(
            'api/registerBuildingsUsage',
            {
                feature: 'hotkeys-*.protocol',
            }
        );
        const lstBuildings = Object.values(
            (window[PREFIX] as Vue).$t('dispatchCenterBuildings')
        );
        const id = (
            (window[PREFIX] as Vue).$store.state.api.buildings as Building[]
        ).find(({ building_type }) => lstBuildings.includes(building_type))?.id;
        if (id) window.lightboxOpen(`/buildings/${id}#tab_protocol`);
    },
};
