radio.onReceivedNumber(function (receivedNumber) {
    if (anchor == 0 && running == 1) {
        if (radio.receivedPacket(RadioPacketProperty.SignalStrength) >= -40) {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
            count += 1
            if (radio_channel == 0) {
                radio_channel = 1
            } else {
                radio_channel = 0
            }
            radio.setGroup(radio_channel)
        }
    }
})
input.onButtonPressed(Button.A, function () {
    if (running == 0) {
        anchor = 1
    }
})
input.onButtonPressed(Button.AB, function () {
    if (anchor == 1) {
        radio_channel = 1
        radio.setGroup(1)
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(count)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (anchor == 0 && running == 0) {
        basic.showNumber(3)
        basic.pause(1000)
        basic.showNumber(2)
        basic.pause(1000)
        basic.showNumber(1)
        basic.pause(1000)
        basic.clearScreen()
        music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground)
        count = 0
        running = 1
        start_time = input.runningTime()
    }
})
let start_time = 0
let radio_channel = 0
let anchor = 0
let count = 0
let running = 0
running = 0
count = 0
anchor = 0
radio_channel = 0
radio.setGroup(radio_channel)
radio.setTransmitPower(7)
basic.showIcon(IconNames.Tortoise)
loops.everyInterval(100, function () {
    if (anchor == 1) {
        basic.showNumber(radio_channel)
        radio.sendNumber(0)
    } else {
        if (running == 1) {
            if (input.runningTime() - start_time >= 15000) {
                music.play(music.builtinPlayableSoundEffect(soundExpression.spring), music.PlaybackMode.UntilDone)
                basic.showNumber(count)
                running = 0
            }
        }
    }
})
