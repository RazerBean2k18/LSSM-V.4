module.exports = {
    arrCounter: {
        resetTexts: {
            counter: 'ARR-Counter',
            highlight: 'ARR border',
            selection: 'Vehicle selection',
            counter_highlight: 'ARR counter / border',
            counter_selection: 'ARR counter and vehicle selection',
            highlight_selection: 'ARR border and vehicle selection',
            counter_highlight_selection:
                'ARR counter / border and vehicle selection',
        },
        reset: '{text} reset',
    },
    arrHover: {
        reset: 'The vehicle selection is reset before!',
        headers: {
            set: 'Set',
            attribute: 'Name',
            free: 'Free',
            max: 'Max',
            status: 'Status',
        },
        titles: {
            set: 'So often this combination is selected when you press the ARR',
            attribute: 'The combination described in this line',
            free: 'So often this combination is available',
            max: 'You can select this ARR until this combination is no longer available',
        },
        arrSpecs: {
            fire: 'Firetrucks',
            wasser_amount: 'Gallons of water',
            elw: 'Battalion Chief unit',
            elw2: 'Mobile Command Vehicle',
            fire_investigation: 'Fire Investigation Unit',
            dlk: 'Platform trucks',
            rtw: 'ALS Ambulance',
            ktw: 'BLS Ambulance',
            rw: 'Heavy rescue vehicle',
            fly_car: 'Fly-Car',
            rescueboat: 'Large Rescue Boat',
            fireboat: 'Large Fireboat',
            gwa: 'Mobile Air Unit',
            gwl2wasser: 'Water Tanker',
            gwgefahrgut: 'HazMat',
            arff: 'ARFF',
            hems: 'HEMS',
            kdow_orgl: 'EMS Chief',
            grtw: 'Mass Casualty Unit',
            fustw: 'Patrol Car',
            police_motorcycle: 'Police Motorcycle',
            fustw_or_police_motorcycle: 'Patrol car or Police Motorcycle',
            polizeihubschrauber: 'Police helicopter',
            swat: 'SWAT',
            swat_armored_vehicle: 'SWAT Armoured Vehicle',
            swat_suv: 'SWAT SUV',
            k9: 'k-9 Unit',
            gkw: 'Utility Truck',
            boot: 'Boats (General)',
            brush_vehicle: 'Wildland fire vehicle',
            brush_truck: 'Wildland fire engine',
            brush_truck_1: 'Type 3 engine',
            brush_truck_2: 'Type 5 engine',
            brush_truck_3: 'Type 7 engine',
            brush_truck_4: 'Type 4 engine',
            brush_truck_5: 'Type 6 engine',
            dozer_trailer: 'Dozer Trailer',
            fire_aviation: 'Fire aviation',
            water_drop_helicopter: 'Water drop helicopter',
            air_tanker: 'Air tanker',
            heavy_air_tanker: 'Heavy air tanker',
            crew_carrier: 'Crew Carrier',
            fbi_unit: 'FBI Unit',
            fbi_investigation_unit: 'FBI Investigation Unit',
            fbi_mobile_command: 'FBI Mobile Command',
            fbi_bomb_tech: 'FBI Bomb Tech',
            fbi_drone: 'FBI Surveillance Drone',
            sheriff_unit: 'Sheriff Unit',
        },
    },
    enhancedMissingVehicles: {
        vehicle: 'Vehicle type',
        missing: 'Missing on mission',
        driving: 'En-route',
        total: 'Still needed',
        tip: {
            dragging: 'drag window',
            textMode: 'textmode on/off',
            minified: 'collapse',
            overlay: 'overlay',
            reload: 'reload',
            pushRight: 'show this box above vehicle list',
            pushLeft: 'show this box at original position',
        },
        selected: 'Selected',
        foam: 'gal. foam',
        water: 'gal. water',
        staffPrefix: ['We need'],
        staff: {
            [/^SWAT Personnel$/u]: [16, 26],
        },
        towingVehicles: {
            // Note: Only the ones that are towed by vehicles of the same group! If e.g. a MzB can be towed by vehicles of several groups, it MUST NOT be listed here.
            57: [41],
            40: [41],
            22: [8],
        },
        vehiclesByRequirement: {
            [/^firetruck(s)?$/u]: [0, 1, 13, 18, 30, 33, 48],
            [/^platform truck(s)?$/u]: [2, 13],
            [/^Battalion chief unit(s)?$/u]: [3, 12],
            [/^Heavy Rescue Vehicle(s)?$/u]: [4, 8, 18, 21, 28, 61],
            [/^Mobile Air$/u]: [6],
            [/^Water Tanker(s)?$/u]: [7, 33],
            [/^Mobile Command Vehicle(s)?$/u]: [12],
            [/^HazMat$/u]: [9, 50],
            [/^Ambulance(s)?$/u]: [5, 27, 48, 49, 50],
            [/^Patrol car(s)?$/u]: [10, 26, 19, 47, 49, 56, 62],
            [/^HEMS$/u]: [11],
            [/^Policehelicopter(s)?$/u]: [14],
            [/^SWAT Personells$/u]: [16, 26],
            [/^SWAT$/u]: [16, 26],
            [/^ARFF$/u]: [17],
            [/^K-9 Unit(s)?$/u]: [19],
            [/^Large fire boat(s)?$/u]: [24],
            [/^Large rescue boat(s)?$/u]: [25],
            [/^Light Boat(s)?$/u]: [21, 22],
            [/^Wildland fire vehicle(s)?$/u]: [30, 31, 32, 38, 39, 40],
            [/^Airborne firefighting vehicle(s)?$/u]: [35, 36, 37],
            [/^FBI Unit(s)?$/u]: [42],
            [/^FBI Investigation wagon(s)?$/u]: [43],
            [/^FBI Investigation wagons? or Surveillance Drones?$/u]: [43, 46],
            [/^FBI Mobile Command Center(s)?$/u]: [44],
            [/^FBI Bomb Technician Vehicle(s)?$/u]: [45],
            [/^FBI Surveillance Drone(s)?$/u]: [46],
            [/^Sheriff(s)?$/u]: [47],
            [/^Patrol Boat(s)?$/u]: [55],
            [/^ATF Unit(s)?$/u]: [53],
            [/^ATF Lab Vehicle(s)?$/u]: [54],
            [/^DEA Unit(s)?$/u]: [51],
            [/^DEA Clan Lab(s)?$/u]: [52],
            [/^Warden('s)? Truck(s)?$/u]: [56],
            [/^EMS Mobile Command$/u]: [60],
            [/^Fire Investigation(s)? Unit(s)?$/u]: [62, 63],
            [/^Foam Tender(s)?$/u]: [64, 65],
        },
    },
    tailoredTabs: {
        allTab: 'All',
        occupiedTab: 'Follow-up',
        vehicleMissing: {
            title: 'One vehicle is not present in any tab | Several vehicles are not present in any tab',
            text: 'The following vehicle types are only present in the "All" tab:',
            hide: 'Hide Note',
            close: 'Close Note till change',
        },
    },
    patientCollapse: {
        combis: 'Combinations',
        amount: 'Amount',
        summary: {
            total: 'patients',
            treated: 'being treated',
        },
    },
    hideVehicleList: {
        show: 'Show vehicle list',
        hide: 'Hide vehicle list',
    },
    vehiclePlayerCounter: {
        ' ': '',
        'driving': 'en Route',
        'atScene': 'at Scene',
        'total': 'Total',
        'vehicles': 'Vehicles',
        'players': 'Players',
    },
};
