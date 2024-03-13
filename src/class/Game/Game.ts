import { Alert, ImageSourcePropType } from "react-native"
import { GameObject } from "../Element/Element"
import { GameForm, Stage, ThemeOption } from "./GameForm"
import images from "../../images"
import { Goal } from "../Goal/Goal"
import { Settings } from "../../contexts/settingsContext"

export class Game {
    theme: ThemeOption
    background: ImageSourcePropType

    objects: (GameObject | Goal)[] = []
    images = images.game[1]
    goals: ImageSourcePropType[] = []

    filter?: { hex: string; opacity: number }

    settings: Settings

    reRender: () => void

    stage: Stage = 1
    misclicks = 0
    time = 0
    found = 0
    loading = true

    constructor(data: GameForm, reRender: () => void) {
        this.reRender = reRender
        this.theme = data.theme
        this.settings = data.settings
        this.stage = data.stage || 1

        this.background = this.images.backgrounds[this.stage]
        if (this.stage != 1) {
            this.filter = this.stage == 2 ? { hex: "#ff5b00", opacity: 0.32 } : { hex: "#0d2284", opacity: 0.42 }
        }

        for (let index = 0; index < data.settings.goals; index++) {
            this.addGoal()
        }

        for (let index = 0; index < data.settings.objects; index++) {
            this.addObject()
        }

        for (let index = 0; index < data.settings.scenery; index++) {
            this.addObject(true)
        }

        this.loading = false
        console.log(`elements: ${data.settings.objects}`)
    }

    private getRandomValidImage(images: any, goal?: boolean) {
        const max_index = Object.entries(images).reduce((maximum, [key]) => (Number(key) > maximum ? Number(key) : maximum), 1)

        const random_index = Math.ceil(Math.random() * max_index)
        let random_image = images[random_index]

        if (goal && this.goals.includes(random_image)) {
            random_image = this.getRandomValidImage(images, true)
        }

        return random_image
    }

    private addObject(scenery?: boolean) {
        const image = this.getRandomValidImage(scenery ? this.images.scenery : this.images.props)
        const object = new GameObject({ image: image.url, width: image.width, height: image.height, settings: this.settings, scenery }, this.reRender)
        this.objects.push(object)
    }

    private addGoal() {
        const image = this.getRandomValidImage(this.images.objectives, true)
        const object = new Goal({ image: image.url, width: image.width, height: image.height, settings: this.settings }, this.reRender)
        this.goals.push(image)
        this.objects.push(object)
    }

    getObjectsOverlapping(object: GameObject) {
        const overlapping = this.objects.filter((item) => {
            if (item === object) return false

            const itemRight = item.x + item.width
            const itemBottom = item.y + item.height
            const objectRight = object.x + object.width
            const objectBottom = object.y + object.height

            const overlapsX = item.x < objectRight && itemRight > object.x

            const overlapsY = item.y < objectBottom && itemBottom > object.y

            return overlapsX && overlapsY
        })

        return overlapping
    }

    onGoal(object: Goal) {
        if (!object.found) {
            object.onGoal()
            this.found += 1
        }
    }

    onObjectPress(object: GameObject | Goal) {
        if (object instanceof Goal) {
            this.onGoal(object)
            return
        }

        const overlapping = this.getObjectsOverlapping(object)
        const overlapped_goal = overlapping.find((item) => item instanceof Goal)
        if (overlapped_goal instanceof Goal && !overlapped_goal.found && overlapped_goal.elevation < object.elevation) {
            this.onGoal(overlapped_goal)
            return
        }

        this.misclicks += 1
        this.reRender()
    }
}
