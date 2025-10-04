import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Text } from "react-native";

type StarProps = {
  title: string;
};

export default function Star({ title }: StarProps) {
  const [rating, setRating] = useState<number>(0);

  return (
    <>
      <Text style={{ fontSize: 18, color: "black" }}>{title}</Text>
      <Rating
        style={{ alignItems: "flex-start" }}
        type="custom"
        ratingCount={5}
        startingValue={rating}
        imageSize={30}
        onFinishRating={(v: React.SetStateAction<number>) => setRating(v)}
        tintColor="#fff"
        ratingBackgroundColor="#e5e7eb"
        // readonly={true}
      />
    </>
  );
}
