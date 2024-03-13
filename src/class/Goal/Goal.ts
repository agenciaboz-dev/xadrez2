import { GameObject } from "../Element/Element"
import { ObjectForm } from "../Element/ObjectForm"

export class Goal extends GameObject {
    found = false

    constructor(data: ObjectForm, reRender: () => void) {
        super(data, reRender)
    }

    onGoal() {
        this.found = true
        this.reRender()
    }
}
