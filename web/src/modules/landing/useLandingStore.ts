import produce, { Draft } from "immer";
import { WritableDraft } from "immer/dist/internal";
import create, { State, StateCreator } from "zustand";
import { combine } from "zustand/middleware";

type mid = 'idle' | 'team'
type DefaultState = {
    teamId: string
    layout: {
        mid: mid
    }
}

const defaultState = () => {
    const teamId: string = ''
    const layout = { 
        mid: 'idle'
    }

    return {
        layout,
        teamId
    }
}

export  const useLandingStore = create(
    combine(defaultState() as DefaultState, (set) => ({
        // set: (fn:(draft:WritableDraft<DefaultState>) => void) => (set(produce(fn))) 
        setLayout : (x: { layout: { mid: mid } }) =>  {    
            set(x)
        },
        setTeamId: (x: {teamId:string}) => {
            set(x)
        }
    })
    )
)