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
scene.setBackgroundColor(12)
tiles.setTilemap(tilemap`level1`)
let mySprite = sprites.create(img`
    . . . . f f f f f f f f . . . . 
    . . f f f f f f f f f f f f . . 
    . f f f f 2 2 2 2 2 2 f f f f . 
    . f f 2 2 3 3 2 2 2 2 2 2 f f . 
    f f f 2 2 3 3 2 2 2 2 2 2 f f f 
    f f 2 2 2 2 2 2 2 2 2 2 2 2 f f 
    f f 2 2 2 2 2 2 2 2 2 2 2 2 f f 
    f f 2 2 2 2 2 2 2 2 2 2 2 2 f f 
    f f 2 2 2 2 2 2 2 2 2 2 2 2 f f 
    f f 2 2 2 2 2 2 2 2 2 2 2 2 f f 
    f f 2 2 2 2 2 2 2 2 2 2 2 2 f f 
    f f f 2 2 2 2 2 2 2 2 2 2 f f f 
    . f f 2 2 2 2 2 2 2 2 2 2 f f . 
    . f f f f 2 2 2 2 2 2 f f f f . 
    . . f f f f f f f f f f f f . . 
    . . . . f f f f f f f f . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 1))
SetUpChest(2, 3)
SetUpChest(4, 3)
