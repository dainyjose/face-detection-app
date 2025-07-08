import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Linking, useWindowDimensions, StyleSheet } from 'react-native';
import {
  Camera as VisionCamera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import { useIsFocused } from '@react-navigation/native';
import { Camera, Face, FaceDetectionOptions } from 'react-native-vision-camera-face-detector';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const VideoRecordingScreen = () => {
  const [cameraPermission, setCameraPermission] = useState('');
  const [microphonePermission, setMicrophonePermission] = useState('');
  const device = useCameraDevice('front');
  const [showCamera, setShowCamera] = useState(false);

  const { hasPermission } = useCameraPermission();
  const [faceStatus, setFaceStatus] = useState<{ yaw: string; pitch: string; eye: string } | null>(
    null,
  );
  const { width, height } = useWindowDimensions();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function getPermission() {
      const CameraPermission = await VisionCamera.requestCameraPermission();
      const MicroPhonesPermission = await VisionCamera.requestMicrophonePermission();
      setCameraPermission(CameraPermission);
      setMicrophonePermission(MicroPhonesPermission);

      if (MicroPhonesPermission === 'granted' || CameraPermission === 'granted') {
        const timer = setTimeout(() => {
          setShowCamera(true);
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        await Linking.openSettings();
      }
    }
    getPermission();
  }, [isFocused]);

  const aFaceW = useSharedValue(0);
  const aFaceH = useSharedValue(0);
  const aFaceX = useSharedValue(0);
  const aFaceY = useSharedValue(0);
  const drawFaceBounds = (face?: Face) => {
    if (face) {
      const { width, height, x, y } = face.bounds;
      aFaceW.value = width;
      aFaceH.value = height;
      aFaceX.value = x;
      aFaceY.value = y;
    } else {
      aFaceW.value = aFaceH.value = aFaceX.value = aFaceY.value = 0;
    }
  };

  const faceBoxStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    borderWidth: 4,
    borderLeftColor: 'rgb(0,255,0)',
    borderRightColor: 'rgb(0,255,0)',
    borderBottomColor: 'rgb(0,255,0)',
    borderTopColor: 'rgb(0,255,0)',
    width: withTiming(aFaceW.value, { duration: 100 }),
    height: withTiming(aFaceH.value, { duration: 100 }),
    left: withTiming(aFaceX.value, { duration: 100 }),
    top: withTiming(aFaceY.value, { duration: 100 }),
  }));
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: 'accurate',
    landmarkMode: 'all',
    contourMode: 'none',
    classificationMode: 'all',
    trackingEnabled: false,
    windowWidth: width,
    windowHeight: height,
    autoScale: true,
  }).current;

  const handleFacesDetection = (faces: Face[]) => {
    try {
      if (faces?.length > 0) {
        const face = faces[0];

        drawFaceBounds(face);
        setFaceStatus({
          yaw: face.yawAngle > 15 ? 'Right' : face.yawAngle < -15 ? 'Left' : 'Center',
          pitch: face.pitchAngle > 15 ? 'Up' : face.pitchAngle < -10 ? 'Down' : 'Center',
          eye:
            face.leftEyeOpenProbability > 0.7 && face.rightEyeOpenProbability > 0.7
              ? 'Open'
              : 'Close',
        });
      } else {
        drawFaceBounds();
      }
    } catch (error) {
      console.error('Error in face detection:', error);
    }
  };

  if (!hasPermission) return <Text>Camera permission is required to use this feature.</Text>;
  if (device == null) return <Text>Camera device not found.</Text>;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        faceDetectionCallback={handleFacesDetection}
        faceDetectionOptions={faceDetectionOptions}
      />
      <Animated.View style={[faceBoxStyle, styles.animatedView]}>
        <Text style={styles.statusText}>Yaw: {faceStatus?.yaw}</Text>
        <Text style={styles.statusText}>Pitch: {faceStatus?.pitch}</Text>
        <Text style={styles.statusText}>Eye: {faceStatus?.eye}</Text>
      </Animated.View>
    </View>
    // <View
    //   style={[
    //     Platform.OS === 'ios' && {
    //       marginBottom: 20,
    //     },
    //     {
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       alignContent: 'center',
    //       paddingBottom: 10,
    //       flex: 1,
    //     },
    //   ]}
    // >
    //   {BMLLoading && <ActivityIndicator />}
    //   {showCamera ? (
    //     <>
    //       {device == null ? (
    //         <ActivityIndicator />
    //       ) : (
    //         <View
    //           style={{
    //             flex: 1,
    //             width: '100%',
    //             height: '60%',
    //           }}
    //         >
    //           <VisionCamera
    //             style={StyleSheet.absoluteFill}
    //             onInitialized={() => {
    //               setShowCamera(true);
    //             }}
    //             ref={camera}
    //             device={device}
    //             isActive={true}
    //             video={true}
    //             audio={true}
    //             collapsable
    //             faceDetectionCallback={handleFacesDetection}
    //             faceDetectionOptions={faceDetectionOptions}
    //           />

    //           <View style={{ flex: 1 / 10, alignContent: 'center', alignItems: 'center' }}>
    //             {/* {recording ? ( */}
    //             <TouchableOpacity
    //               style={[
    //                 {
    //                   alignContent: 'center',
    //                   alignItems: 'center',

    //                   backgroundColor: recording ? 'red' : 'blue',
    //                 },
    //               ]}
    //               onPress={() => {
    //                 recording ? StopRecord() : StartRecord();
    //               }}
    //             >
    //               <Text
    //                 style={{
    //                   textAlign: 'center',
    //                   marginHorizontal: 3,
    //                   fontSize: 12,
    //                   color: 'white',
    //                   padding: 10,
    //                 }}
    //               >
    //                 {recording ? 'Stop' : 'Start'}
    //               </Text>
    //             </TouchableOpacity>
    //             <Animated.View style={[faceBoxStyle, styles.animatedView]}>
    //               <Text style={styles.statusText}>Yaw: {faceStatus?.yaw}</Text>
    //               <Text style={styles.statusText}>Pitch: {faceStatus?.pitch}</Text>
    //               <Text style={styles.statusText}>Eye: {faceStatus?.eye}</Text>
    //             </Animated.View>
    //           </View>
    //         </View>
    //       )}
    //     </>
    //   ) : (
    //     <></>
    //   )}
    // </View>
  );
};

export default VideoRecordingScreen;
const styles = StyleSheet.create({
  animatedView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderRadius: 20,
    padding: 10,
  },
  statusText: {
    color: 'lightgreen',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
