/*
 * C5 ratting fits (EFT) + screenshots. Originally from Triff.Tools (GPL-3.0).
 * To update a fit after a patch, edit the fitText/notes below.
 */

import Golem5n from "../assets/fits/Golem5n.png";
import Golem4n from "../assets/fits/Golem4n.png";
import Golem5y from "../assets/fits/Golem5y.png";
import Golem4y from "../assets/fits/Golem4y.png";

import Vargur5n from "../assets/fits/Vargur5n.png";
import Vargur4n from "../assets/fits/Vargur4n.png";
import Vargur5y from "../assets/fits/Vargur5y.png";
import Vargur4y from "../assets/fits/Vargur4y.png";

import Paladin5n from "../assets/fits/Paladin5n.png";
import Paladin4n from "../assets/fits/Paladin4n.png";
import Paladin5y from "../assets/fits/Paladin5y.png";
import Paladin4y from "../assets/fits/Paladin4y.png";

import Kronos5n from "../assets/fits/Kronos5n.png";
import Kronos4n from "../assets/fits/Kronos4n.png";
import Kronos5y from "../assets/fits/Kronos5y.png";
import Kronos4y from "../assets/fits/Kronos4y.png";

export type Marauder = "Golem" | "Vargur" | "Paladin" | "Kronos";
export type YesNo = "yes" | "no";

export type FitEntry = {
    image: string;
    fitText: string;
    notes: string;
};

export type MarauderFitMap = Record<
    Marauder,
    {
        "5n": FitEntry;
        "5y": FitEntry;
        "4n": FitEntry;
        "4y": FitEntry;
    }
>;

export const FIT_DATA: MarauderFitMap = {
    Golem: {
        "5n": {
            image: Golem5n,
            fitText: `[Golem, Golem Marauders V No Dread]

Capacitor Flux Coil II
Capacitor Flux Coil II
Ballistic Control System II
Ballistic Control System II

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Target Painter II
Cap Recharger II
Pith X-Type X-Large Shield Booster
Cap Recharger II
Pithum C-Type Multispectrum Shield Hardener

Medium Energy Nosferatu II
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Bastion Module I
Imperial Navy Large EMP Smartbomb
Imperial Navy Large EMP Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Mid-grade Crystal Alpha
Mid-grade Crystal Beta
Mid-grade Crystal Gamma
Mid-grade Crystal Delta
Mid-grade Crystal Epsilon
Zainou 'Snapshot' Torpedoes TD-603
Zainou 'Deadeye' Missile Bombardment MB-703
Zainou 'Deadeye' Guided Missile Precision GP-803
Zainou 'Deadeye' Target Navigation Prediction TN-903
Zainou 'Deadeye' Rapid Launch RL-1003

Inferno Rage Torpedo x7000
Mjolnir Javelin Torpedo x3840
Mjolnir Rage Torpedo x5000
Caldari Navy Mjolnir Torpedo x6500
Mobile Tractor Unit x1`,
            notes:
                `You only need to run crystals in your pod if you are doing Core Strongholds. If you skip Strongholds, Crystals are NOT needed. The other implants in the fit are worthwhile still.

The NOS is only necessary on the drifter, and only if you're solo boxing the site and will be the only thing targetted by his neuts.

Only reload to faction torps for cruisers if you are solo. If there are multiple marauders running the site, focus your DPS on the battleships and let your friends/alts kill the smaller things.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "5y": {
            image: Golem5y,
            fitText: `[Golem, Marauders V With Dread]

Capacitor Flux Coil II
Capacitor Flux Coil II
Capacitor Flux Coil II
Ballistic Control System II

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Target Painter II
True Sansha Cap Recharger
Pith X-Type X-Large Shield Booster
True Sansha Cap Recharger
Pithum C-Type Multispectrum Shield Hardener

Corpum A-Type Medium Energy Nosferatu
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Bastion Module I
Imperial Navy Large EMP Smartbomb
Imperial Navy Large EMP Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Mid-grade Crystal Alpha
Mid-grade Crystal Beta
Mid-grade Crystal Gamma
Mid-grade Crystal Delta
Mid-grade Crystal Epsilon
Zainou 'Snapshot' Torpedoes TD-603
Zainou 'Deadeye' Missile Bombardment MB-703
Zainou 'Deadeye' Guided Missile Precision GP-803
Zainou 'Deadeye' Target Navigation Prediction TN-903
Zainou 'Deadeye' Rapid Launch RL-1003

Inferno Rage Torpedo x7000
Mjolnir Javelin Torpedo x3840
Mjolnir Rage Torpedo x5000
Caldari Navy Mjolnir Torpedo x6500
Mobile Tractor Unit x1`,
            notes:
                `You only need to run crystals in your pod if you are doing Core Strongholds. If you skip Strongholds, Crystals are NOT needed. The other implants in the fit are worthwhile still.

The NOS is only necessary on the drifter, and only if you're being targetted by his neuts.

Only reload to faction torps for cruisers if you are the only marauder on site. If there are multiple marauders running the site, focus your DPS on the battleships and let your friends/alts kill the smaller things.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "4n": {
            image: Golem4n,
            fitText: `[Golem, Marauders IV No Dread]

Capacitor Flux Coil II
Capacitor Flux Coil II
Ballistic Control System II
Ballistic Control System II

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Target Painter II
Cap Recharger II
Pith X-Type X-Large Shield Booster
Cap Recharger II
Pithum C-Type Multispectrum Shield Hardener

Medium Energy Nosferatu II
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Bastion Module I
Imperial Navy Large EMP Smartbomb
Imperial Navy Large EMP Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Mid-grade Crystal Alpha
Mid-grade Crystal Beta
Mid-grade Crystal Gamma
Mid-grade Crystal Delta
Mid-grade Crystal Epsilon
Zainou 'Snapshot' Torpedoes TD-603
Zainou 'Deadeye' Missile Bombardment MB-703
Zainou 'Deadeye' Guided Missile Precision GP-803
Zainou 'Deadeye' Target Navigation Prediction TN-903
Zainou 'Deadeye' Rapid Launch RL-1003

Inferno Rage Torpedo x7000
Mjolnir Javelin Torpedo x3840
Mjolnir Rage Torpedo x5000
Caldari Navy Mjolnir Torpedo x6500
Mobile Tractor Unit x1`,
            notes:
                `HIGHLY RECOMMEND SYNTH BLUE PILL IF YOU ARE SOLO ON LAST WAVE OF STRONGHOLD.

You only need to run crystals in your pod if you are doing Core Strongholds. If you skip Strongholds, Crystals and synth blue pill are NOT needed. The other implants in the fit are worthwhile still.

The NOS is only necessary on the drifter, and only if you're solo boxing the site and will be the only thing targetted by his neuts.

Only reload to faction torps for cruisers if you are solo. If there are multiple marauders running the site, focus your DPS on the battleships and let your friends/alts kill the smaller things.

USING SYNTH DRUGS is almost always worthwhile. Synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "4y": {
            image: Golem4y,
            fitText: `[Golem, Marauders IV With Dread]

Capacitor Flux Coil II
Capacitor Flux Coil II
Capacitor Flux Coil II
Ballistic Control System II

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Target Painter II
True Sansha Cap Recharger
Pith X-Type X-Large Shield Booster
True Sansha Cap Recharger
Pithum C-Type Multispectrum Shield Hardener

Corpum A-Type Medium Energy Nosferatu
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Torpedo Launcher II, Mjolnir Rage Torpedo
Bastion Module I
Imperial Navy Large EMP Smartbomb
Imperial Navy Large EMP Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Mid-grade Crystal Alpha
Mid-grade Crystal Beta
Mid-grade Crystal Gamma
Mid-grade Crystal Delta
Mid-grade Crystal Epsilon
Zainou 'Snapshot' Torpedoes TD-603
Zainou 'Deadeye' Missile Bombardment MB-703
Zainou 'Deadeye' Guided Missile Precision GP-803
Zainou 'Deadeye' Target Navigation Prediction TN-903
Zainou 'Deadeye' Rapid Launch RL-1003

Inferno Rage Torpedo x7000
Mjolnir Javelin Torpedo x3840
Mjolnir Rage Torpedo x5000
Caldari Navy Mjolnir Torpedo x6500
Mobile Tractor Unit x1`,
            notes:
                `HIGHLY RECOMMEND SYNTH BLUE PILL IF SOLO ON LAST WAVE OF STRONGHOLD.

You only need to run crystals in your pod if you are doing Core Strongholds. If you skip Strongholds, Crystals are NOT needed. The other implants in the fit are worthwhile still.

The NOS is only necessary on the drifter, and only if you're being targetted by his neuts.

Only reload to faction torps for cruisers if you are the only marauder on site. If there are multiple marauders running the site, focus your DPS on the battleships and let your friends/alts kill the smaller things.

USING SYNTH DRUGS is almost always worthwhile. Synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
    },

    Vargur: {
        "5n": {
            image: Vargur5n,
            fitText: `[Vargur, Marauder V No Dread]

Capacitor Flux Coil II
Capacitor Flux Coil II
Capacitor Flux Coil II
Gyrostabilizer II
Gyrostabilizer II
Gyrostabilizer II

Compact Multispectrum Shield Hardener
Compact Multispectrum Shield Hardener
Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Pith X-Type X-Large Shield Booster
Cap Recharger II

800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
Federation Navy Large Plasma Smartbomb
Federation Navy Large Plasma Smartbomb
Bastion Module I

Large Capacitor Control Circuit II
Large Capacitor Control Circuit I

Mid-grade Crystal Alpha
Mid-grade Crystal Beta
Mid-grade Crystal Gamma
Mid-grade Crystal Delta
Mid-grade Crystal Epsilon
Eifyr and Co. 'Gunslinger' Motion Prediction MR-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Eifyr and Co. 'Gunslinger' Large Projectile Turret LP-1003

Barrage L x7824
Hail L x11840
Republic Fleet Phased Plasma L x8000`,
            notes:
                `You only need to run crystals in your pod if you are doing Core Strongholds. If you skip Strongholds, Crystals are NOT needed. The other implants in the fit are worthwhile still.

This is the cheapest way to rat C5 sites out of all the marauders. Blinging the tank (dual Pith C-Type multispecs) or the DPS (Faction Gyros) is not necessary, but will help if ganked or if you spawn a wave early.

You will struggle to apply DPS to the final wave of a stronghold due to the orbit distance of the ships and your applied damage with Barrage. While it is possible, it will be very slow and boring. Bring a friend, or an alt.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "5y": {
            image: Vargur5y,
            fitText: `[Vargur, Marauder V With Dread]

Capacitor Flux Coil II
Capacitor Flux Coil II
Capacitor Flux Coil II
Capacitor Flux Coil II
Gyrostabilizer II
Gyrostabilizer II

Compact Multispectrum Shield Hardener
Compact Multispectrum Shield Hardener
Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Pith X-Type X-Large Shield Booster
True Sansha Cap Recharger

800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
Federation Navy Large Plasma Smartbomb
Federation Navy Large Plasma Smartbomb
Bastion Module I

Large Capacitor Control Circuit II
Large Capacitor Control Circuit I

Mid-grade Crystal Alpha
Mid-grade Crystal Beta
Mid-grade Crystal Gamma
Mid-grade Crystal Delta
Mid-grade Crystal Epsilon
Eifyr and Co. 'Gunslinger' Motion Prediction MR-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Eifyr and Co. 'Gunslinger' Large Projectile Turret LP-1003

Barrage L x7824
Hail L x11840
Republic Fleet Phased Plasma L x8000`,
            notes:
                `You only need to run crystals in your pod if you are doing Core Strongholds. If you skip Strongholds, Crystals are NOT needed. The other implants in the fit are worthwhile still.

This is the cheapest way to rat C5 sites out of all the marauders. Blinging the tank (dual Pith C-Type multispecs) or the DPS (Faction Gyros) is not necessary, but will help if ganked or if you spawn a wave early.

You will struggle to apply DPS to the final wave of a stronghold due to the orbit distance of the ships and your applied damage with Barrage. While it is possible, it will be very slow and boring. Bring a friend, or an alt.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "4n": {
            image: Vargur4n,
            fitText: `[Vargur, Marauder IV No Dread]

Capacitor Flux Coil II
Capacitor Flux Coil II
Capacitor Flux Coil II
Gyrostabilizer II
Gyrostabilizer II
Gyrostabilizer II

Compact Multispectrum Shield Hardener
Compact Multispectrum Shield Hardener
Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Pith X-Type X-Large Shield Booster
Cap Recharger II

800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
Federation Navy Large Plasma Smartbomb
Federation Navy Large Plasma Smartbomb
Bastion Module I

Large Capacitor Control Circuit II
Large Capacitor Control Circuit I

Mid-grade Crystal Alpha
Mid-grade Crystal Beta
Mid-grade Crystal Gamma
Mid-grade Crystal Delta
Mid-grade Crystal Epsilon
Eifyr and Co. 'Gunslinger' Motion Prediction MR-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Eifyr and Co. 'Gunslinger' Large Projectile Turret LP-1003

Barrage L x7824
Hail L x11840
Republic Fleet Phased Plasma L x8000`,
            notes:
                `You only need to run crystals in your pod if you are doing Core Strongholds. If you skip Strongholds, Crystals are NOT needed. The other implants in the fit are worthwhile still.

This is the cheapest way to rat C5 sites out of all the marauders. Blinging the tank (dual Pith C-Type multispecs) or the DPS (Faction Gyros) is not necessary, but will help if ganked or if you spawn a wave early.

You will struggle to apply DPS to the final wave of a stronghold due to the orbit distance of the ships and your applied damage with Barrage. While it is possible, it will be very slow and boring. Bring a friend, or an alt.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "4y": {
            image: Vargur4y,
            fitText: `[Vargur, Marauder IV With Dread]

Capacitor Flux Coil II
Capacitor Flux Coil II
Capacitor Flux Coil II
Capacitor Flux Coil II
Gyrostabilizer II
Gyrostabilizer II

Compact Multispectrum Shield Hardener
Compact Multispectrum Shield Hardener
Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Pith X-Type X-Large Shield Booster
True Sansha Cap Recharger

800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
800mm Repeating Cannon II, Hail L
Federation Navy Large Plasma Smartbomb
Federation Navy Large Plasma Smartbomb
Bastion Module I

Large Capacitor Control Circuit II
Large Capacitor Control Circuit I

Mid-grade Crystal Alpha
Mid-grade Crystal Beta
Mid-grade Crystal Gamma
Mid-grade Crystal Delta
Mid-grade Crystal Epsilon
Eifyr and Co. 'Gunslinger' Motion Prediction MR-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Eifyr and Co. 'Gunslinger' Large Projectile Turret LP-1003

Barrage L x7824
Hail L x11840
Republic Fleet Phased Plasma L x8000`,
            notes:
                `You only need to run crystals in your pod if you are doing Core Strongholds. If you skip Strongholds, Crystals are NOT needed. The other implants in the fit are worthwhile still.

This is the cheapest way to rat C5 sites out of all the marauders. Blinging the tank (dual Pith C-Type multispecs) or the DPS (Faction Gyros) is not necessary, but will help if ganked or if you spawn a wave early.

You will struggle to apply DPS to the final wave of a stronghold due to the orbit distance of the ships and your applied damage with Barrage. While it is possible, it will be very slow and boring. Bring a friend, or an alt.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
    },

    Paladin: {
        "5n": {
            image: Paladin5n,
            fitText: `[Paladin, Marauders V No Dread]

Centum C-Type Multispectrum Energized Membrane
Centum C-Type Multispectrum Energized Membrane
Imperial Navy Heat Sink
Imperial Navy Heat Sink
True Sansha Large Armor Repairer
True Sansha Large Armor Repairer
Dark Blood Capacitor Power Relay

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Imperial Navy Cap Recharger
Imperial Navy Cap Recharger

Bastion Module I
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Heavy Knave Scoped Energy Nosferatu
Federation Navy Large Plasma Smartbomb
Federation Navy Large Plasma Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Hobgoblin II x10
Hornet EC-300 x5

Mid-grade Asklepian Alpha
Mid-grade Asklepian Beta
Mid-grade Asklepian Gamma
Mid-grade Asklepian Delta
Mid-grade Asklepian Epsilon
Inherent Implants 'Noble' Repair Systems RS-603
Inherent Implants 'Lancer' Controlled Bursts CB-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Inherent Implants 'Lancer' Large Energy Turret LE-1003

Conflagration L x12
Scorch L x8
Imperial Navy Multifrequency L x8`,
            notes:
                `You only need to run Asklepians in your pod if you are doing Core Strongholds. If you skip Strongholds, Asklepians are NOT needed. The other implants in the fit are worthwhile still.

This is the The only marauder that excels at the core stronghold due to your long range application.

The NOS is only necessary on the drifter, and only if you're solo boxing the site and will be the only thing targetted by his neuts.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "5y": {
            image: Paladin5y,
            fitText: `[Paladin, Marauders V With Dread]

Centum C-Type Multispectrum Energized Membrane
Centum C-Type Multispectrum Energized Membrane
Dark Blood Capacitor Power Relay
Imperial Navy Heat Sink
True Sansha Large Armor Repairer
True Sansha Large Armor Repairer
Dark Blood Capacitor Power Relay

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Imperial Navy Cap Recharger
Imperial Navy Cap Recharger

Bastion Module I
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Heavy Knave Scoped Energy Nosferatu
Federation Navy Large Plasma Smartbomb
Federation Navy Large Plasma Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Hobgoblin II x10
Hornet EC-300 x5

Mid-grade Asklepian Alpha
Mid-grade Asklepian Beta
Mid-grade Asklepian Gamma
Mid-grade Asklepian Delta
Mid-grade Asklepian Epsilon
Inherent Implants 'Noble' Repair Systems RS-603
Inherent Implants 'Lancer' Controlled Bursts CB-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Inherent Implants 'Lancer' Large Energy Turret LE-1003

Conflagration L x12
Scorch L x8
Imperial Navy Multifrequency L x8`,
            notes:
                `You only need to run Asklepians in your pod if you are doing Core Strongholds. If you skip Strongholds, Asklepians are NOT needed. The other implants in the fit are worthwhile still.

This is the The only marauder that excels at the core stronghold due to your long range application.

The NOS is only necessary on the drifter, and only if you're the only thing targetted by his neuts.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "4n": {
            image: Paladin4n,
            fitText: `[Paladin, Marauders IV No Dread]

Centum C-Type Multispectrum Energized Membrane
Centum C-Type Multispectrum Energized Membrane
Imperial Navy Heat Sink
Imperial Navy Heat Sink
True Sansha Large Armor Repairer
True Sansha Large Armor Repairer
Dark Blood Capacitor Power Relay

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Imperial Navy Cap Recharger
Imperial Navy Cap Recharger

Bastion Module I
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Heavy Knave Scoped Energy Nosferatu
Federation Navy Large Plasma Smartbomb
Federation Navy Large Plasma Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Hobgoblin II x10
Hornet EC-300 x5

Mid-grade Asklepian Alpha
Mid-grade Asklepian Beta
Mid-grade Asklepian Gamma
Mid-grade Asklepian Delta
Mid-grade Asklepian Epsilon
Inherent Implants 'Noble' Repair Systems RS-603
Inherent Implants 'Lancer' Controlled Bursts CB-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Inherent Implants 'Lancer' Large Energy Turret LE-1003

Conflagration L x12
Scorch L x8
Imperial Navy Multifrequency L x8`,
            notes:
                `You only need to run Asklepians in your pod if you are doing Core Strongholds. If you skip Strongholds, Asklepians are NOT needed. The other implants in the fit are worthwhile still.

This is the The only marauder that excels at the core stronghold due to your long range application.

The NOS is only necessary on the drifter, and only if you're solo boxing the site and will be the only thing targetted by his neuts.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "4y": {
            image: Paladin4y,
            fitText: `[Paladin, Marauders IV With Dread]

Centum C-Type Multispectrum Energized Membrane
Centum C-Type Multispectrum Energized Membrane
Dark Blood Capacitor Power Relay
Imperial Navy Heat Sink
True Sansha Large Armor Repairer
True Sansha Large Armor Repairer
Dark Blood Capacitor Power Relay

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Imperial Navy Cap Recharger
Imperial Navy Cap Recharger

Bastion Module I
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Mega Pulse Laser II, Conflagration L
Heavy Knave Scoped Energy Nosferatu
Federation Navy Large Plasma Smartbomb
Federation Navy Large Plasma Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Hobgoblin II x10
Hornet EC-300 x5

Mid-grade Asklepian Alpha
Mid-grade Asklepian Beta
Mid-grade Asklepian Gamma
Mid-grade Asklepian Delta
Mid-grade Asklepian Epsilon
Inherent Implants 'Noble' Repair Systems RS-603
Inherent Implants 'Lancer' Controlled Bursts CB-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Inherent Implants 'Lancer' Large Energy Turret LE-1003

Conflagration L x12
Scorch L x8
Imperial Navy Multifrequency L x8`,
            notes:
                `You only need to run Asklepians in your pod if you are doing Core Strongholds. If you skip Strongholds, Asklepians are NOT needed. The other implants in the fit are worthwhile still.

This is the The only marauder that excels at the core stronghold due to your long range application.

The NOS is only necessary on the drifter, and only if you're the only thing targetted by his neuts.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
    },

    Kronos: {
        "5n": {
            image: Kronos5n,
            fitText: `[Kronos, Marauders V No Dread]

Capacitor Power Relay II
Corpii A-Type Explosive Coating
Corpii C-Type Multispectrum Coating
Federation Navy Magnetic Field Stabilizer
Federation Navy Magnetic Field Stabilizer
Core X-Type Large Armor Repairer
Core X-Type Large Armor Repairer

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Shadow Serpentis Tracking Computer, Optimal Range Script
Cap Recharger II
Cap Recharger II

Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Bastion Module I
Imperial Navy Large EMP Smartbomb
Imperial Navy Large EMP Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Mid-grade Asklepian Alpha
Mid-grade Asklepian Beta
Mid-grade Asklepian Gamma
Mid-grade Asklepian Delta
Mid-grade Asklepian Epsilon
Inherent Implants 'Noble' Repair Systems RS-603
Zainou 'Deadeye' Trajectory Analysis TA-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Zainou 'Deadeye' Large Hybrid Turret LH-1003

Synth Frentix Booster

Null L x8900
Void L x19941`,
            notes:
                `You only need to run Asklepians in your pod if you are doing Core Strongholds. If you skip Strongholds, Asklepians are NOT needed. The other implants in the fit are worthwhile still.

The Kronos struggles with long range application more than any other marauder. The Synth Frentix is almost non-negotiable, especially on strongholds.

You have the highest raw DPS and tracking of any marauder, but also the most expensive to fit (barely) and hardest to hit metrics with. Very rewarding to fly, especially on Garrisons.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "5y": {
            image: Kronos5y,
            fitText: `[Kronos, Marauders V With Dread]

True Sansha Capacitor Power Relay
Corpii A-Type Explosive Coating
Corpii C-Type Multispectrum Coating
True Sansha Capacitor Power Relay
Federation Navy Magnetic Field Stabilizer
Core X-Type Large Armor Repairer
Core X-Type Large Armor Repairer

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Shadow Serpentis Tracking Computer, Optimal Range Script
True Sansha Cap Recharger
True Sansha Cap Recharger

Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Bastion Module I
Imperial Navy Large EMP Smartbomb
Imperial Navy Large EMP Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Mid-grade Asklepian Alpha
Mid-grade Asklepian Beta
Mid-grade Asklepian Gamma
Mid-grade Asklepian Delta
Mid-grade Asklepian Epsilon
Inherent Implants 'Noble' Repair Systems RS-603
Zainou 'Deadeye' Trajectory Analysis TA-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Zainou 'Deadeye' Large Hybrid Turret LH-1003

Synth Frentix Booster

Null L x8900
Void L x19941`,
            notes:
                `You only need to run Asklepians in your pod if you are doing Core Strongholds. If you skip Strongholds, Asklepians are NOT needed. The other implants in the fit are worthwhile still.

The Kronos struggles with long range application more than any other marauder. The Synth Frentix is almost non-negotiable, especially on strongholds.

You have the highest raw DPS and tracking of any marauder, but also the most expensive to fit (barely) and hardest to hit metrics with. Very rewarding to fly, especially on Garrisons.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "4n": {
            image: Kronos4n,
            fitText: `[Kronos, Marauders IV No Dread]

Capacitor Power Relay II
Corpii A-Type Explosive Coating
Corpii C-Type Multispectrum Coating
Federation Navy Magnetic Field Stabilizer
Federation Navy Magnetic Field Stabilizer
Core X-Type Large Armor Repairer
Core X-Type Large Armor Repairer

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Shadow Serpentis Tracking Computer, Optimal Range Script
Cap Recharger II
Cap Recharger II

Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Bastion Module I
Imperial Navy Large EMP Smartbomb
Imperial Navy Large EMP Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Mid-grade Asklepian Alpha
Mid-grade Asklepian Beta
Mid-grade Asklepian Gamma
Mid-grade Asklepian Delta
Mid-grade Asklepian Epsilon
Inherent Implants 'Noble' Repair Systems RS-603
Zainou 'Deadeye' Trajectory Analysis TA-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Zainou 'Deadeye' Large Hybrid Turret LH-1003

Synth Frentix Booster

Null L x8900
Void L x19941`,
            notes:
                `You only need to run Asklepians in your pod if you are doing Core Strongholds. If you skip Strongholds, Asklepians are NOT needed. The other implants in the fit are worthwhile still.

The Kronos struggles with long range application more than any other marauder. The Synth Frentix is almost non-negotiable, especially on strongholds.

You have the highest raw DPS and tracking of any marauder, but also the most expensive to fit (barely) and hardest to hit metrics with. Very rewarding to fly, especially on Garrisons.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
        "4y": {
            image: Kronos4y,
            fitText: `[Kronos, Marauders IV With Dread]

True Sansha Capacitor Power Relay
Corpii A-Type Explosive Coating
Corpii C-Type Multispectrum Coating
True Sansha Capacitor Power Relay
Federation Navy Magnetic Field Stabilizer
Core X-Type Large Armor Repairer
Core X-Type Large Armor Repairer

Republic Fleet Large Cap Battery
Republic Fleet Large Cap Battery
Shadow Serpentis Tracking Computer, Optimal Range Script
True Sansha Cap Recharger
True Sansha Cap Recharger

Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Neutron Blaster Cannon II, Void L
Bastion Module I
Imperial Navy Large EMP Smartbomb
Imperial Navy Large EMP Smartbomb

Large Capacitor Control Circuit II
Large Capacitor Control Circuit II

Mid-grade Asklepian Alpha
Mid-grade Asklepian Beta
Mid-grade Asklepian Gamma
Mid-grade Asklepian Delta
Mid-grade Asklepian Epsilon
Inherent Implants 'Noble' Repair Systems RS-603
Zainou 'Deadeye' Trajectory Analysis TA-703
Inherent Implants 'Squire' Capacitor Management EM-803
Eifyr and Co. 'Gunslinger' Surgical Strike SS-903
Zainou 'Deadeye' Large Hybrid Turret LH-1003

Synth Frentix Booster

Null L x8900
Void L x19941`,
            notes:
                `You only need to run Asklepians in your pod if you are doing Core Strongholds. If you skip Strongholds, Asklepians are NOT needed. The other implants in the fit are worthwhile still.

The Kronos struggles with long range application more than any other marauder. The Synth Frentix is almost non-negotiable, especially on strongholds.

You have the highest raw DPS and tracking of any marauder, but also the most expensive to fit (barely) and hardest to hit metrics with. Very rewarding to fly, especially on Garrisons.

USING SYNTH DRUGS is almost always worthwhile. While these fits are designed not to need them, synth mindflood to add some capacitor, or exile/blue pill for tank, along with frentix/crash for tracking and application are all extremely cheap and make a noticable difference. It is encouraged to run these drugs when you're getting the hang of a new fit, and even beyond that.`,
        },
    },
};
