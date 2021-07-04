import React, { createContext, useContext, useReducer, useState } from 'react';
import { RecordingRules, RoomType } from '../types';
import { TwilioError } from 'twilio-video';
import { settingsReducer, initialSettings, Settings, SettingsAction } from './settings/settingsReducer';
import useActiveSinkId from './useActiveSinkId/useActiveSinkId';

export interface StateContextType {
    error: TwilioError | Error | null;
    setError(error: TwilioError | Error | null): void;
    getToken(name: string, room: string, passcode?: string): Promise<{ room_type: RoomType; token: string }>;
    user?: null | { displayName: undefined; photoURL: undefined};
    isAuthReady?: boolean;
    isFetching: boolean;
    activeSinkId: string;
    setActiveSinkId(sinkId: string): void;
    settings: Settings;
    dispatchSetting: React.Dispatch<SettingsAction>;
    roomType?: RoomType;
    updateRecordingRules(room_sid: string, rules: RecordingRules): Promise<object>;
}

export const StateContext = createContext<StateContextType>(null!);

export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
    const [error, setError] = useState<TwilioError | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [activeSinkId, setActiveSinkId] = useActiveSinkId();
    const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);
    const [roomType, setRoomType] = useState<RoomType>();
    const [user, setUser] = useState<StateContextType['user']>();

    let contextValue = {
        error,
        setError,
        isFetching,
        activeSinkId,
        setActiveSinkId,
        settings,
        dispatchSetting,
        roomType,
    } as StateContextType;

    contextValue = {
        ...contextValue,
        getToken: async (user_identity, room_name) => {
            const endpoint = '/token';

            return fetch(endpoint, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    user_identity,
                    room_name,
                    create_conversation: true,
                }),
            }).then(res => {
                console.log(res);
                return res.json()});
        },
        updateRecordingRules: async (room_sid, rules) => {
            const endpoint =  '/recordingrules';

            return fetch(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ room_sid, rules }),
                method: 'POST',
            })
                .then(async res => {
                    const jsonResponse = await res.json();

                    if (!res.ok) {
                        const recordingError = new Error(
                            jsonResponse.error?.message || 'There was an error updating recording rules'
                        );
                        recordingError.code = jsonResponse.error?.code;
                        return Promise.reject(recordingError);
                    }

                    return jsonResponse;
                })
                .catch(err => setError(err));
        },
    };

    const getToken: StateContextType['getToken'] = async (name, room) => {
        setIsFetching(true);
        try {
            const res = await contextValue
                .getToken(name, room);
            setRoomType(res.room_type);
            setIsFetching(false);
            return res;
        } catch (err) {
            setError(err);
            setIsFetching(false);
            return await Promise.reject(err);
        }
    };

    const updateRecordingRules: StateContextType['updateRecordingRules'] = async (room_sid, rules) => {
        setIsFetching(true);
        try {
            const res = await contextValue
                .updateRecordingRules(room_sid, rules);
            setIsFetching(false);
            return res;
        } catch (err) {
            setError(err);
            setIsFetching(false);
            return await Promise.reject(err);
        }
    };

    return (
        <StateContext.Provider value={{ ...contextValue, getToken, updateRecordingRules }}>
            {props.children}
        </StateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useAppState must be used within the AppStateProvider');
    }
    return context;
}
