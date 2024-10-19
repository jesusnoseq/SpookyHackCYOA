package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/admin"
)

type ReadableTransform struct {
	Name            string
	Transformations []string
}

var readableTransforms = []ReadableTransform{
	{
		Name: "s1",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a dark shadow behind",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks looks confused and a little worry;multiple_true",
			"e_saturation:-20",
			"co_rgb:3B41F6,e_colorize:10",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s2a",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a dark shadow behind and a demonic face appears in the screen",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks looks focused on the investigation working with the computer;multiple_true",
			"e_saturation:-40",
			"co_rgb:3B41F6,e_colorize:10",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s2b",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a dark shadow behind and a angry demonic face appears in the screen",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks looks very surprised and confused;multiple_true",
			"e_saturation:-40",
			"co_rgb:0D0E2A,e_colorize:30",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s3a",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a dark shadow behind and a demonic face appears in the screen",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks looks very focused analyzing an issue working with a pc;multiple_true",
			//"e_gen_replace:from_hands if dont exists create them;to_hands working with a pc;multiple_true",
			"e_saturation:-20",
			"co_rgb:0D0E2A,e_colorize:30",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s3b",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a dark shadow behind with a bunch of cables unplugged",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks looks very angry aggresive and desesperate;multiple_true",
			"e_saturation:-20",
			"co_rgb:0D0E2A,e_colorize:30",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s4a",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a dark shadow behind",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks looks very happy and relieved;multiple_true",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s4b",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a very dark shadow behind with a bunch of cables unplugged and a forum in the screen",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks with eyes extemely wide open and red and concentrated using a computer;multiple_true",
			"e_saturation:-30",
			"co_rgb:0D0E2A,e_colorize:40",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s5a",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big room",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks looks very happy and thinking;multiple_true",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s5d",
		Transformations: []string{
			"e_gen_background_replace:prompt_In a bar with my colleages",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks looks very happy and speaking with mouth open;multiple_true",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s5c",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a very dark shadow behind with a bunch of cables unplugged and a forum in the screen",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks with a happy and relieved expresion;multiple_true",
			"e_saturation:-30",
			"q_auto:eco",
			"dpr_auto",
		},
	},
	{
		Name: "s5b",
		Transformations: []string{
			"e_gen_background_replace:prompt_A programmer's desk in big a dark room with a very dark shadow behind with a bunch of cables unplugged and demon laughing with the mouth open in the screen",
			"e_gen_replace:from_Replace the facial expression in the image. Identify each face and modify only the expression keeping the rest of the features;to_eyes mouth and cheeks expresing a lot of fear and the mouth close;multiple_true",
			"e_saturation:-40",
			"co_rgb:000000,e_colorize:40",
			"q_auto:eco",
			"dpr_auto",
		},
	},
}

func main() {
	cld, err := cloudinary.NewFromParams(
		os.Getenv("CLOUD_NAME"),
		os.Getenv("API_KEY"),
		os.Getenv("API_SECRET"),
	)
	if err != nil {
		log.Fatalf("Failed to initialize Cloudinary: %v", err)
	}

	ctx := context.Background()

	for _, rt := range readableTransforms {
		_, err = cld.Admin.DeleteTransformation(
			ctx, admin.DeleteTransformationParams{
				Transformation: rt.Name,
			},
		)
		if err != nil {
			log.Fatalf("Failed to delete transformation %q: - %v", rt.Name, err)
		}
		_, err = cld.Admin.CreateTransformation(ctx, admin.CreateTransformationParams{
			Name:           rt.Name,
			Transformation: strings.Join(rt.Transformations, "/"),
		})
		if err != nil {
			log.Fatalf("Failed to create transformation %q: - %v", rt.Name, err)
		}
	}

	transforms, err := cld.Admin.ListTransformations(ctx, admin.ListTransformationsParams{
		MaxResults: 10,
	})
	for _, t := range transforms.Transformations {
		if strings.HasPrefix(t.Name, "t_s") {
			fmt.Printf("%+v\n", t)
		}
	}

}
