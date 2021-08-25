namespace SpriteKind {
    export const Chest = SpriteKind.create()
}
function SetUpChest (X: number, Y: number) {
    tiles.setTileAt(tiles.getTileLocation(X, Y), assets.tile`chestClosed`)
    tiles.setWallAt(tiles.getTileLocation(X, Y), true)
}
function OpenChest (X: number, Y: number) {
    tiles.setTileAt(tiles.getTileLocation(X, Y), assets.tile`chestOpen`)
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    evaluateMySprite()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    calculatedPlayerInteractiveCol = Math.round(mySprite.left / mapTileSize)
    calculatedPlayerInteractiveRow = Math.round(mySprite.top / mapTileSize)
    if (mySpriteFacing == FacingUp) {
        calculatedPlayerInteractiveRow += -1
    } else if (mySpriteFacing == FacingDown) {
        calculatedPlayerInteractiveRow += 1
    } else if (mySpriteFacing == FacingLeft) {
        calculatedPlayerInteractiveCol += -1
    } else if (mySpriteFacing == FacingRight) {
        calculatedPlayerInteractiveCol += 1
    }
    CheckForInteractivity(calculatedPlayerInteractiveCol, calculatedPlayerInteractiveRow)
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    evaluateMySprite()
})
function UseComputer (Col: number, Row: number) {
    if (mySpriteFacing == FacingUp && tiles.tileAtLocationEquals(tiles.getTileLocation(Col, Row), assets.tile`ComputerScreenOn0`)) {
        ComputerScreenOn(Col, Row)
    } else if (mySpriteFacing == FacingUp && tiles.tileAtLocationEquals(tiles.getTileLocation(Col, Row), assets.tile`ComputerScreenOn`)) {
        ComputerScreenOff(Col, Row)
    }
}
function ComputerScreenOff (Col: number, Row: number) {
    tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`ComputerScreenOn0`)
    music.powerDown.play()
    game.showLongText("Powering Down", DialogLayout.Bottom)
}
function CheckForInteractivity (Col: number, Row: number) {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(Col, Row), assets.tile`chestClosed`)) {
        OpenChest(Col, Row)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(Col, Row), assets.tile`ComputerScreenOn0`)) {
        UseComputer(Col, Row)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(Col, Row), assets.tile`ComputerScreenOn`)) {
        UseComputer(Col, Row)
    }
}
function SetUpComputer (X: number, Y: number) {
    tiles.setTileAt(tiles.getTileLocation(X, Y), assets.tile`ComputerScreenOn0`)
    tiles.setWallAt(tiles.getTileLocation(X, Y), true)
}
function evaluateMySprite () {
    if (controller.dx() == 0 && controller.dy() == 0) {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    } else if (controller.dx() > 0) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . . f 7 7 7 7 7 7 7 1 f f . . 
            . . f 5 5 7 7 7 7 7 1 1 1 1 f . 
            . . f 5 5 5 5 5 5 7 7 7 f f . . 
            . . f 5 5 d d 5 d d f d f . . . 
            . . . f 5 d d d d d f d f . . . 
            . . . . f d d d d d d d f . . . 
            . . . f 2 f d d d d d f . . . . 
            . . . f 2 f f f f f f f . . . . 
            . . f e f d d f 4 4 4 f f . . . 
            . . f 4 4 d d f 4 4 f 4 4 f . . 
            . . f 4 4 f f f f f e 4 f . . . 
            . . . f f f . . . . f f . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . . f 7 7 7 7 7 7 7 1 f f . . 
            . . f 5 5 7 7 7 7 7 1 1 1 1 f . 
            . . f 5 5 5 5 5 5 7 7 7 f f . . 
            . . f 5 5 d d 5 d d f d f . . . 
            . . . f 5 d d d d d f d f . . . 
            . . . . f d d d d d d d f . . . 
            . . . f 2 f d d d d d f . . . . 
            . . . f 2 f f f f f f f . . . . 
            . . . . f f d d f 4 4 f . . . . 
            . . . f 4 4 d d f f f 4 f . . . 
            . . . f e 4 4 f f e 4 4 f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . . f 7 7 7 7 7 7 7 1 f f . . 
            . . f 5 5 7 7 7 7 7 1 1 1 1 f . 
            . . f 5 5 5 5 5 5 7 7 7 f f . . 
            . . f 5 5 d d 5 d d f d f . . . 
            . . . f 5 d d d d d f d f . . . 
            . . . . f d d d d d d d f . . . 
            . . . f 2 f d d d d d f . . . . 
            . . . f 2 f f f f f f f . . . . 
            . . f e f 4 4 f d d f f f . . . 
            . . f 4 4 f 4 f d d f 4 4 f . . 
            . . f 4 4 f f f f f e 4 f . . . 
            . . . f f f . . . . f f . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . . f 7 7 7 7 7 7 7 1 f f . . 
            . . f 5 5 7 7 7 7 7 1 1 1 1 f . 
            . . f 5 5 5 5 5 5 7 7 7 f f . . 
            . . f 5 5 d d 5 d d f d f . . . 
            . . . f 5 d d d d d f d f . . . 
            . . . . f d d d d d d d f . . . 
            . . . f 2 f d d d d d f . . . . 
            . . . f 2 f f f f f f f . . . . 
            . . . . f f f d d f 4 f . . . . 
            . . . f 4 4 f d d f f 4 f . . . 
            . . . f e 4 4 f f e 4 4 f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        mySpriteAnimationMs,
        true
        )
        mySpriteFacing = FacingRight
    } else if (controller.dx() < 0) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f f 1 7 7 7 7 7 7 7 f . . . 
            . f 1 1 1 1 7 7 7 7 7 5 5 f . . 
            . . f f 7 7 7 5 5 5 5 5 5 f . . 
            . . . f d f d 5 d d d 5 5 f . . 
            . . . f d f d d d d d 5 f . . . 
            . . . f d d d d d d d f . . . . 
            . . . . f d d d d d f 2 f . . . 
            . . . . f f f f f f f 2 f . . . 
            . . . f f f d d f 4 4 f e f . . 
            . . f 4 4 f d d f 4 f 4 4 f . . 
            . . . f 4 e f f f f f 4 4 f . . 
            . . . . f f . . . . f f f . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f f 1 7 7 7 7 7 7 7 f . . . 
            . f 1 1 1 1 7 7 7 7 7 5 5 f . . 
            . . f f 7 7 7 5 5 5 5 5 5 f . . 
            . . . f d f d 5 d d d 5 5 f . . 
            . . . f d f d d d d d 5 f . . . 
            . . . f d d d d d d d f . . . . 
            . . . . f d d d d d f 2 f . . . 
            . . . . f f f f f f f 2 f . . . 
            . . . . f 4 f d d f 4 f . . . . 
            . . . f 4 f f d d f f 4 f . . . 
            . . . f 4 4 e f f 4 4 e f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f f 1 7 7 7 7 7 7 7 f . . . 
            . f 1 1 1 1 7 7 7 7 7 5 5 f . . 
            . . f f 7 7 7 5 5 5 5 5 5 f . . 
            . . . f d f d 5 d d d 5 5 f . . 
            . . . f d f d d d d d 5 f . . . 
            . . . f d d d d d d d f . . . . 
            . . . . f d d d d d f 2 f . . . 
            . . . . f f f f f f f 2 f . . . 
            . . . f f 4 4 f d d f f e f . . 
            . . f 4 4 f 4 f d d f 4 4 f . . 
            . . . f 4 e f f f f f 4 4 f . . 
            . . . . f f . . . . f f f . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f f 1 7 7 7 7 7 7 7 f . . . 
            . f 1 1 1 1 7 7 7 7 7 5 5 f . . 
            . . f f 7 7 7 5 5 5 5 5 5 f . . 
            . . . f d f d 5 d d d 5 5 f . . 
            . . . f d f d d d d d 5 f . . . 
            . . . f d d d d d d d f . . . . 
            . . . . f d d d d d f 2 f . . . 
            . . . . f f f f f f f 2 f . . . 
            . . . . f 4 f d d f 4 f . . . . 
            . . . f 4 f f d d f f 4 f . . . 
            . . . f 4 4 e f f 4 4 e f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        mySpriteAnimationMs,
        true
        )
        mySpriteFacing = FacingLeft
    } else if (controller.dy() < 0) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f 5 7 7 7 7 7 7 7 7 5 f . . 
            . . f 5 5 7 7 7 7 7 7 5 5 f . . 
            . f d 5 5 5 5 5 5 5 5 5 5 d f . 
            . f d d 5 5 5 5 5 5 5 5 d d f . 
            . . f f d d 5 5 5 5 d d f f . . 
            . . f f f f 2 2 2 2 f f f f . . 
            . f d f f 2 2 f f 2 2 f f d f . 
            . f d f f 2 2 1 1 2 2 f f d f . 
            . . f f f f 2 2 2 2 f f f f . . 
            . . . f 4 f f f f f f 4 f . . . 
            . . . f 4 4 4 f f 4 4 4 f . . . 
            . . . . f f f . . f f f . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f 5 7 7 7 7 7 7 7 7 5 f . . 
            . . f 5 5 7 7 7 7 7 7 5 5 f . . 
            . f d 5 5 5 5 5 5 5 5 5 5 d f . 
            . f d d 5 5 5 5 5 5 5 5 d d f . 
            . . f f d d 5 5 5 5 d d f f . . 
            . . . f f f 2 2 2 2 f f f d f . 
            . . f f f 2 2 f f 2 2 f f d f . 
            . f d f f 2 2 1 1 2 2 f f f . . 
            . f d f f f 2 2 2 2 f f f . . . 
            . . f f f f f f f f f 4 f . . . 
            . . . . . . . f f 4 4 4 f . . . 
            . . . . . . . . . f f f . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f 5 7 7 7 7 7 7 7 7 5 f . . 
            . . f 5 5 7 7 7 7 7 7 5 5 f . . 
            . f d 5 5 5 5 5 5 5 5 5 5 d f . 
            . f d d 5 5 5 5 5 5 5 5 d d f . 
            . . f f d d 5 5 5 5 d d f f . . 
            . . f f f f 2 2 2 2 f f f f . . 
            . f d f f 2 2 f f 2 2 f f d f . 
            . f d f f 2 2 1 1 2 2 f f d f . 
            . . f f f f 2 2 2 2 f f f f . . 
            . . . f 4 f f f f f f 4 f . . . 
            . . . f 4 4 4 f f 4 4 4 f . . . 
            . . . . f f f . . f f f . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f 5 7 7 7 7 7 7 7 7 5 f . . 
            . . f 5 5 7 7 7 7 7 7 5 5 f . . 
            . f d 5 5 5 5 5 5 5 5 5 5 d f . 
            . f d d 5 5 5 5 5 5 5 5 d d f . 
            . . f f d d 5 5 5 5 d d f f . . 
            . f d f f f 2 2 2 2 f f f . . . 
            . f d f f 2 2 f f 2 2 f f f . . 
            . . f f f 2 2 1 1 2 2 f f d f . 
            . . . f f f 2 2 2 2 f f f d f . 
            . . . f 4 f f f f f f f f f . . 
            . . . f 4 4 4 f f . . . . . . . 
            . . . . f f f . . . . . . . . . 
            `],
        mySpriteAnimationMs,
        true
        )
        mySpriteFacing = FacingUp
    } else if (controller.dy() > 0) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f f 7 7 7 7 7 7 7 7 f f . . 
            . f 5 5 f 7 1 1 1 1 7 f 5 5 f . 
            . f 5 5 d f f f f f f d 5 5 f . 
            . f 5 5 d d d d d d d d 5 5 f . 
            . f d 5 d d f d d f d d 5 d f . 
            . f d d d d f d d f d d d d f . 
            . . f f d d d b b d d d f f . . 
            . f d d f f f f f f f f d d f . 
            . f d d f 4 4 f f 4 4 f d d f . 
            . . f f e 4 4 4 4 4 4 e f f . . 
            . . f 4 f f f 4 4 f f f 4 f . . 
            . . f 4 4 4 4 f f 4 4 4 4 f . . 
            . . f f f f f . . f f f f f . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f f 7 7 7 7 7 7 7 7 f f . . 
            . f 5 5 f 7 1 1 1 1 7 f 5 5 f . 
            . f 5 5 d f f f f f f d 5 5 f . 
            . f 5 5 d d d d d d d d 5 5 f . 
            . f d 5 d d f d d f d d 5 d f . 
            . f d d d d f d d f d d f f f . 
            . . f f d d d b b d d f d d f . 
            . f f f f f f f f f f f d d f . 
            . f d d f 4 4 f f 4 4 f f f f . 
            . f d d f 4 4 4 4 4 4 e f f . . 
            . . f f f f f 4 4 f f f 4 f . . 
            . . . . . . . f f 4 4 4 4 f . . 
            . . . . . . . . . f f f f f . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f f 7 7 7 7 7 7 7 7 f f . . 
            . f 5 5 f 7 1 1 1 1 7 f 5 5 f . 
            . f 5 5 d f f f f f f d 5 5 f . 
            . f 5 5 d d d d d d d d 5 5 f . 
            . f d 5 d d f d d f d d 5 d f . 
            . f d d d d f d d f d d d d f . 
            . . f f d d d b b d d d f f . . 
            . f d d f f f f f f f f d d f . 
            . f d d f 4 4 f f 4 4 f d d f . 
            . . f f e 4 4 4 4 4 4 e f f . . 
            . . f 4 f f f 4 4 f f f 4 f . . 
            . . f 4 4 4 4 f f 4 4 4 4 f . . 
            . . f f f f f . . f f f f f . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f 7 7 7 7 7 7 f . . . . 
            . . . f 7 7 7 7 7 7 7 7 f . . . 
            . . f f 7 7 7 7 7 7 7 7 f f . . 
            . f 5 5 f 7 1 1 1 1 7 f 5 5 f . 
            . f 5 5 d f f f f f f d 5 5 f . 
            . f 5 5 d d d d d d d d 5 5 f . 
            . f d 5 d d f d d f d d 5 d f . 
            . f f f d d f d d f d d d d f . 
            . f d d f d d b b d d d f f . . 
            . f d d f f f f f f f f f f f . 
            . f f f f 4 4 f f 4 4 f d d f . 
            . . f f e 4 4 4 4 4 4 f d d f . 
            . . f 4 f f f 4 4 f f f f f . . 
            . . f 4 4 4 4 f f . . . . . . . 
            . . f f f f f . . . . . . . . . 
            `],
        mySpriteAnimationMs,
        true
        )
        mySpriteFacing = FacingDown
    }
}
function ComputerScreenOn (Col: number, Row: number) {
    tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`ComputerScreenOn`)
    music.powerUp.play()
    game.showLongText("Powering Up", DialogLayout.Bottom)
}
let calculatedPlayerInteractiveRow = 0
let calculatedPlayerInteractiveCol = 0
let mySprite: Sprite = null
let mySpriteFacing = ""
let FacingDown = ""
let FacingUp = ""
let FacingLeft = ""
let FacingRight = ""
let mySpriteAnimationMs = 0
let mapTileSize = 0
mapTileSize = 16
mySpriteAnimationMs = 100
FacingRight = "Right"
FacingLeft = "Left"
FacingUp = "Up"
FacingDown = "Down"
mySpriteFacing = "None"
scene.setBackgroundColor(12)
tiles.setTilemap(tilemap`level1`)
mySprite = sprites.create(assets.image`Trainer Blondie`, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 1))
SetUpChest(2, 3)
SetUpChest(4, 3)
SetUpChest(12, 9)
SetUpComputer(6, 3)
SetUpComputer(6, 10)
